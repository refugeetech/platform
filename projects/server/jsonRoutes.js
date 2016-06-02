////////////// GET CATEGORIES //////////////

// get all defined category values
JsonRoutes.add("get", "/categories/json", function (req, res, next) {
  var result = _.map(ProjectsSchema.getDefinition('challengeCategories').autoform.options,(category,index)=>{return category.value}); // All cetagories in the ProjectsSchema 
  JsonRoutes.sendResult
  (res, 200,
/* API RESPONSE */
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:['category.value']
      },
      pseudoQuery:'return category.value from each challengeCategories.options in ProjectsSchema'
    },
    data:result
  });
});

// get all category objects from ProjectsSchema
JsonRoutes.add("get", "/categories/o/json", function (req, res, next) {
  var result = ProjectsSchema.getDefinition('challengeCategories').autoform.options; // All category options in the ProjectsSchema 
  JsonRoutes.sendResult
  (res, 200,
/* API RESPONSE */
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:['category']
      },
      pseudoQuery:'return challengeCategories.options in ProjectsSchema'
    },
    data:result
  });
});


////////////// GET PROJECTS //////////////

////////////// GET PROJECTS DUMP //////////////
// Returns JSON array containing all projects in Projects collection.
JsonRoutes.add("get", "/projects/json", function (req, res, next) {
  var result = Projects.find().fetch(); // Finds all projects and returns array

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
      pseudoQuery:'return all projects'
    },
    data:result
  }); // Sends the result to client
  
});

////////////// GET SINGLE PROJECT //////////////
//  return a single JSON object containing the specified project.
JsonRoutes.add("get", "/projects/:projectId/json", function (req, res, next) {
  var projectId = req.params.projectId; // The project id, in MongoDB
  var result = Projects.findOne(projectId) // Finds matching project and returns object.

  JsonRoutes.sendResult(res, 200,
/* API RESPONSE */
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:'project'
      },
      pseudoQuery:'return project in Projects where ['+req.params.projectId+'] equals project._id'
    },
    data:result
    
  }); // Sends the result to client
  
});

////////////// GET PROJECTS BY CATEGORIES //////////////

////////////// GET PROJECTS: ALL CATEGORIES //////////////
// Finds all projects with all these categories
JsonRoutes.add("get", "/categories/:categories/json", function (req, res, next) {
  var result = Projects.find({challengeCategories: { $all: req.params.categories.split(',') }}).fetch(); 

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
      pseudoQuery:'return project for each project in Projects where all of ['+req.params.categories+'] in project.challengeCategories'
    },
    data:result
  }); // Sends the result to client
  
});

////////////// GET PROJECTS: IN CATEGORIES //////////////
// Finds all projects with any of these categories
JsonRoutes.add("get", "/categories/in/:categories/json", function (req, res, next) {
  var result = Projects.find({challengeCategories: { $in: req.params.categories.split(',') }}).fetch(); 

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
      pseudoQuery:'return project for each project in Projects where any of ['+req.params.categories+'] in project.challengeCategories'
    },
    data:result
  }); // Sends the result to client
  
});

////////////// GET PROJECTS: EQUALS CATEGORIES //////////////

// Finds all projects with only these categories
JsonRoutes.add("get", "/categories/eq/:categories/json", function (req, res, next) {
  var result = Projects.find({challengeCategories: { $eq: req.params.categories.split(',') }}).fetch(); 

  JsonRoutes.sendResult(res, 200,
/* API RESPONSE */
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:'project'
      },
      pseudoQuery:'return projects in Projects where ['+req.params.categories+'] equals project.challengeCategories'
    },
    data:result
    
  }); // Sends the result to client
  
});

////////////// GET ALL PROJECTS BY CATEGORIES //////////////

// Returns JSON array containing all categories in the projects schema and all projects with such a category sorted under each category
JsonRoutes.add("get", "/categories/projects/json", function (req, res, next) {
  var options = ProjectsSchema.getDefinition('challengeCategories').autoform.options; // All cetagories in the ProjectsSchema

  console.log("Categories: "+_.keys(options));
  var result = [];
  
  _.each
  (
    options,(category,index)=>
    {
    result.push
    (
      _.extend
      (
        // category = { label: 'label', value: 'value'}
        _.pick(category,'value'),
        { 
          projects: Projects.find
          (
            {challengeCategories: {$in: [category.value] }}
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
          value:'ProjectsSchema.challengeCategories.options.$.value',
          projects: 'list of projects'
          
        },
        dataStructure:
        [
          {
            value:'category.value',
            projects:['project']
          }
        ]
      },
      pseudoQuery:'return category.value from each challengeCategories.options in ProjectsSchema with return each project in Projects where category.value in project.challengeCategories'
    },
    data:out
  });
});




