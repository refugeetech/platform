////////////// GET TAGS //////////////

// Returns JSON array containing all tags in in the Tags collection
JsonRoutes.add("get", "/tags/json", function (req, res, next) {
  var result = _.map(Tags.find().fetch(),(tag,index)=> {return tag.name}); // Finds all tags and returns array with only name field values

  JsonRoutes.sendResult(res, 200,
/* API RESPONSE */
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
    data:result
    
  });
});

////////////// GET PROJECT BY TAGS //////////////

////////////// GET PROJECTS: ALL TAGS //////////////

// Returns JSON array containing all projects in Projects collection with a specific tag
JsonRoutes.add("get", "/tags/:tags/json", function (req, res, next) {
  var result = Projects.find({tags: { $all: req.params.tags.split(',') }}).fetch(); // Finds all projects with all tags

  JsonRoutes.sendResult(res, 200,
/* API RESPONSE */
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
    data:result
    
  });

});

////////////// GET PROJECTS: IN TAGS //////////////

// Returns JSON array containing all projects in Projects collection with a specific tag
JsonRoutes.add("get", "/tags/in/:tag/json", function (req, res, next) {
  var result = Projects.find({tags: { $in: req.params.tag.split(',') }}).fetch(); // Finds all projects with any tag

  JsonRoutes.sendResult(res, 200,
/* API RESPONSE */
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
    data:result
    
  });

});

////////////// GET PROJECTS: EQUALS TAGS //////////////

// Returns JSON array containing all projects in Projects collection with a specific tag
JsonRoutes.add("get", "/tags/eq/:tags/json", function (req, res, next) {
  var result = Projects.find({tags: { $eq: req.params.tags.split(',') }}).fetch(); // Finds all projects with only these tags

  JsonRoutes.sendResult(res, 200,
/* API RESPONSE */
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:['project']
      },
      pseudoQuery:'return project for each project in database where only ['+req.params.tags+'] in project.tags'
    },
    data:result
    
  });

});


////////////// GET PROJECTS DUMP BY TAGS //////////////

// Returns JSON array containing all tags in in the Tags collection and all projects with that tag sorted under each tag
JsonRoutes.add("get", "/tags/projects/json", function (req, res, next) {
  var tags = Tags.find().fetch(); // Finds all tags and returns array
  
  var result = [];
  _.each
  (
    tags,(tag,index)=>
    {
    result.push
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
/* API RESPONSE */
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
    data:result
  });
});