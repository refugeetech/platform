// Returns JSON array containing all projects in Projects collection with a specific tag
JsonRoutes.add("get", "/tags/only/:tag/json", function (req, res, next) {
  var allProjects = Projects.find({tags: { $eq: req.params.tag.split(',') }}).fetch(); // Finds all projects with only these tags

  JsonRoutes.sendResult(res, 200,
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:['project']
      },
      pseudoQuery:'return project for each project in database where only ['+req.params.tag+'] in project.tags'
    },
    data:allProjects
    
  });

});

// Returns JSON array containing all projects in Projects collection with a specific tag
JsonRoutes.add("get", "/tags/:tag/json", function (req, res, next) {
  var allProjects = Projects.find({tags: { $all: req.params.tag.split(',') }}).fetch(); // Finds all projects with all tags

  JsonRoutes.sendResult(res, 200,
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:['project']
      },
      pseudoQuery:'return project for each project in database where all of ['+req.params.tag+'] in project.tags'
    },
    data:allProjects
    
  });

});

// Returns JSON array containing all projects in Projects collection with a specific tag
JsonRoutes.add("get", "/tags/any/:tag/json", function (req, res, next) {
  var allProjects = Projects.find({tags: { $in: req.params.tag.split(',') }}).fetch(); // Finds all projects with any tag

  JsonRoutes.sendResult(res, 200,
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:['project']
      },
      pseudoQuery:'return project for each project in database where any of ['+req.params.tag+'] in project.tags'
    },
    data:allProjects
    
  });

});

// Returns JSON array containing all tags in in the Tags collection
JsonRoutes.add("get", "/tags/json", function (req, res, next) {
  var allTags = _.map(Tags.find().fetch(),(tag,index)=> {return tag.name}); // Finds all tags and returns array with only name field values

  JsonRoutes.sendResult(res, 200,
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:['tag.name.value']
      },
      pseudoQuery:'return tag.name.value for each tag in database'
    },
    data:allTags
    
  });
});

// Returns JSON array containing all tags in in the Tags collection and all projects with that tag sorted under each tag
JsonRoutes.add("get", "/tags/projects/json", function (req, res, next) {
  var allTags = Tags.find().fetch(); // Finds all tags and returns array
  var out = [];
  _.each
  (
    allTags,(tag,index)=>
    {
    out.push
    (
      _.extend
      (
        
        _.pick(tag,'name'),
        { 
          projects: Projects.find
          (
            {tags: {$in: [tag.name] }}
          ).fetch()
        }
      )
    );
  });
  JsonRoutes.sendResult
  (res, 200,
  {
    meta: {
      schemaDescription:
      {
        fieldDescription:
        {
          name:'the name of the tag',
          projects: 'list of projects'
          
        },
        dataStructure:
        [
          {
            name:'tag.name',
            projects:['project']
          }
        ]
      },
      pseudoQuery:'return tag.name from each tag in database with return each project in database where tag.name in project.tags'
    },
    data:out
  });
});

/*
// Returns JSON array containing all tags in in the Tags collection and all projects with that tag sorted under each tag
JsonRoutes.add("get", "/tags/projects/json", function (req, res, next) {
  var allTags = Tags.find().fetch(); // Finds all tags and returns array
  var out = _.map(allTags,(tag,index)=> {
      return _.map(tag,(value,key)=> {
        if(key == "_id") {
          return;
        }
        var out2 = {name:value};
        out2.projects = Projects.find({tags: {$in: [value]}})
      });
  });
  JsonRoutes.sendResult(res, 200, out); // Sends the result to client
});
*/



/*
// Add route to return a single JSON object containing the specified project.
JsonRoutes.add("get", "/:collection:query/json", function (req, res, next) {
  const reqCollection = req.params.collection;
  var collection = reqCollection == 'projects' ? Projects : reqCollection == 'tags' ? Tags : false;
  if(collection) {
    var documents = collection.find(guery());
  }
  else {
    JsonRoutes.sendResult(res, {data: null , error: {details: 'No such collection:'+reqCollection+', Choose between "projects" or "tags"'});
    return;
  }
  const byFields = req.params.byFields;
  var fields = byFields.split("tags==employment,&name=");
  var query = req.params.tag; // A mongoDB query
  let er;
  let error = false;
  try {
    var projects = Projects.find(query); // Finds matching projects.  
  }
  catch(e) {
    error = true;
    er = e;
  }
  
  query = (qstr) => {
    const nbrFields = qstr.split("&");
    var q = 
  }
  
  JsonRoutes.sendResult(res, {data: !error ? projects.fetch(): null , query:query, error:{ error:error, details:er}}); // Sends the result to client
  
});
*/

/*
// Returns JSON array containing all projects in Projects collection.
JsonRoutes.add("get", "/projects/json", function (req, res, next) {
  var allProjects = Projects.find().fetch(); // Finds all projects and returns array

  JsonRoutes.sendResult(res, 200, allProjects); // Sends the result to client
});
*/