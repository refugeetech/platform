  var ProjectsApiV01 = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    version:'v01',
    defaultHeaders: {'Content-Type': 'application/json; charset=UTF-8'}
  });  
  
  // Generates: GET on /api/v01/projects
  // /api/v01/projects/:id for the Projects collection
  Projects = Mongo.Collection.get('projects');
  if(!Projects) {
    Projects = new Mongo.Collection('projects');
  }
  
  // fixing PUT problems med simpleschema och restivus
  Patch = (collection) => {
    return function() {
      var entity;
      collection.update(this.urlParams.id, {
        $set: this.bodyParams
      });
      entity = collection.findOne(this.urlParams.id);
      return {
        status: 'success',
        data: entity
      };
    };
  };
  
  ProjectsApiV01.addCollection(Projects,
  {
    endpoints: {
      put: {
        action: Patch(Projects)
      }
    }
  });


  ProjectsApiV01.addRoute('projects/ratings', {
    get: function () {
      return {
        status: "success",
        data: _.map(Projects.find().fetch(),(p,i)=> {return ExtendProjectWithRatings(p);})
      };
    }
  });
  
  ProjectsApiV01.addRoute('projects/:id/ratings', {
    get: function () {
      return {
        status: "success",
        data: ExtendProjectWithRatings(Projects.findOne({_id:this.urlParams.id}))
      };
    }
  });
  
  ExtendProjectWithRatings = (project) => {
    return _.extend(project,{upvotes: Ratings.find({rated:{collection:"projects", id:project._id},rating:"UP"}).fetch().length});
  }
  
  PostProject = (project) => {

    const bodyParam = _.clone(project);
    
    try {
      var id = Projects.insert(project);
    }
    catch(e) {
      console.log(e);
      return { status: "error", data: e.toString(), body: bodyParam }
    }
    if(id) {
      return { status: "success", data: Projects.findOne(id) }
    }
    return { status: "error", data: "Cant create project with request body", bodyParams: bodyParam }
  }

  PutProject = (project) => {
    try {
      const bodyParam = _.clone(project);
      var id = project._id;
      var success = Projects.update(id, {
        $set: _.omit(project,'_id')
      });
    }
    catch(e) {
      return { status: "error", data: e, body: bodyParam }
    }
    if(succes !== undefined && success > 0) {
      return { status: "success", data: Projects.findOne(id) }
    }
    return { status: "error", data: "Cant create project with request body", bodyParams: bodyParam }
  }
  
  ProjectsApiV01.addRoute('projects/import', {
    post: function () {
      var response = [];
      var map;
      const operation = this.queryParams.o;
      if(operation) {
        if(operation=='convert') {
          console.log("converting");
          if(this.queryParams.map) {
            map = {};
            _.each(this.queryParams.map.split(","),(t,i)=> {
              const m = t.split(":");
              map[m[0]]=m[1];
            });
            console.log("Using map for conversion:");
            console.log(map);
            
            console.log("checking if map contains all required keys for the project collection");
            const requiredKeys =["name", "description"] //, "challengeCategories"];
            if(_.every(_.values(map),(v,i)=> { return _.contains(requiredKeys,v);})) {
              console.log("success");
              console.log("checking if data contains mapped header keys. Using first object in array as the header.");
              console.log(this.bodyParams[0]);
              if(this.bodyParams[0]) {
                const headerKeys = _.keys(this.bodyParams[0]);
                if(headerKeys) {
                  console.log("headerKeys");
                  console.log(headerKeys);
                  const mapKeys = _.keys(map);
                  console.log("mapKeys");
                  console.log(mapKeys);
                  //has the map the same or larger number of keys as the header
                  if(headerKeys.length >= mapKeys.length) {
                    //does the header contain all 'headerkeys' in the map
                    if(_.every(mapKeys,(k,i)=>{return _.contains(headerKeys,k);})) {
                      console.log("success");
                      console.log("starting the conversion process");
                      console.log("building an array of converted objects");
                      var converted =
                      //map each object to be converted into proper format
                      _.map(this.bodyParams,(cdoc,i)=> {
                        
                        var out = {};
                        const imap = _.invert(map);
                        //inverting gives the correct output keys
                        _.each(_.keys(imap),(hk,i2)=> {
                          // extend the prototype with key:value
                          out[hk]=cdoc[imap[hk]];
                        });
                        return out;
                      });
                      console.log("success", "the converted array now looks like this:",converted);
                      console.log("initiating database operations","running in fiber");
                      
                      var asyncmylife = new Future();
                      
                      _.each(converted,(p,i)=> {
                        response.push(_.extend(PostProject(p),{conversion:{map:map,bodyParams:this.bodyParams[i]}}));
                      });
                      
                      asyncmylife.return({status:"success", data:response});
                      
                      return asyncmylife.wait();
                      
                    }
                    return {status:"error" , data:"headerKeys:"+headerKeys.toString() +" has to contain all keys included in the map:"+map.toString()}
                  }
                  return {status:"error" , data:"headerKeys:"+headerKeys.toString() +" has to have at least the same number of keys as the map: "+map.toString()}
                }
                return {status:"error" , data:"The body of the request has an uknown format"} //@TODO specify the format of the input data 
              }
              return {status:"error" , data:"Either the body of the request is empty or the data is not contained in an array"}
            }
            return {status:"error" , data:"The map: " + map.toString() +  " doesnt contains all required keys for the project collection"}
          }
          return {status:"error" , data:"need to specify a map in the query parameters, example: /import?o=convert&map=froma:tob,fromc:tod,frome:tof"}
        }
        return {status:"error" , data:"No such an operation called: '"+operation+"'"}
      }
      
      var asyncmylife = new Future();
      
      _.each(this.bodyParams,(p,i)=> {
        response.push(_.extend(PostProject(p)));
      });
      
      asyncmylife.return({status:"success", data:response});

      return asyncmylife.wait();
      
    },
    put: function () {
      var asyncmylife = new Future();
      var response = [];
      _.each(this.bodyParams,(p,i)=> {
        response.push(PutProject(p));
      });
      asyncmylife.return({status:"success", data:response});
      return asyncmylife.wait();
    }
  });
  
  Future = Npm.require('fibers/future');
  

 


