// Schema for Projects collection
ProjectsSchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Project Name"
  },
  "description": {
    type: String,
    label: "Project Description (maximum 500 characters)",
    max: 500
  },
  "shortDescription": {
    type: String,
    label: "Project Short Description (maximum 140 characters)",
    max: 140
  },

  "problemCategories": {
  type: [String],
  label: "Problem Categories",
  allowedValues: ['social', 'bureaucracy', 'housing', 'education',
                  'language', 'employment', 'coordination'],
  autoform: {
    options: [
      {label: "Social", value: "social"},
      {label: "Bureaucracy", value: "bureaucracy"},
      {label: "Housing", value: "housing"},
      {label: "Education", value: "education"},
      {label: "Language", value: "language"},
      {label: "Employment", value: "employment"},
      {label: "Coordination", value: "coordination"}
    ]
  }
},

  // TODO: auto-associate user ID that created project
  // "contactPersonId": {
  //   type: String,
  //   label: "Contact Person ID",
  //   regEx: SimpleSchema.RegEx.Id,
  //   optional: true
  // },
  // TODO: Add 'Problems' feature
  // "problemDescription": {
  //   type: String,
  //   label: "Problem Description"
  // },
  // "problemCategories": {
  //   type: [String],
  //   label: "Problem Categories"
  // },

  "tags": {
    type: [String],
    label: "Tags"
  },

// The actual date the project began
  "startupDate": {
    type: Date,
    label: "Project Startup Date"
  },

  "currentStage": {
     type: String,
     allowedValues: [
        'initiation',
        'planning',
        'implementationExecution',
        'operationMonitoring',
        'closing'
     ],
     optional: true,
     label: "Select current project stage",
     autoform: {
        options: [
           {label: "Initiation", value: "initiation"},
           {label: "Planning", value: "planning"},
           {label: "Implementation / Execution", value: "implementationExecution"},
           {label: "Operation / Monitoring", value: "operationMonitoring"},
           {label: "Closing", value: "closing"}
       ]
     }
   },

  // TODO: add Teams feature
  // "teamIds": {
  //   type: [String],
  //   label: "Team IDs",
  //   regEx: SimpleSchema.RegEx.Id,
  //   optional: true
  // },
  // "teamDescription": {
  //   type: String,
  //   label: "Team Description"
  // },
  // "currentStage": {
  //   type: String,
  //   label: "Current Stage"
  // },
  // "startupDate": {
  //   type: Date,
  //   label: "Startup Date"
  // },
  // TODO: Add "Target Groups" feature
  // "targetGroups": {
  //   type: [String],
  //   label: "Target Groups"
  // },
  // "targetLocations": {
  //   type: [String],
  //   label: "Target Locations"
  // },

  "targetPlatforms": {
    type: [String],
    label: "Target Platforms",
    allowedValues: ['web', 'ios', 'android', 'windows-phone'],
    autoform: {
      options: [
        {label: "Web", value: "web"},
        {label: "iOS", value: "ios"},
        {label: "Android", value: "android"},
        {label: "Windows Phone", value: "windows-phone"}
      ]
    }
  },
  "postalAddress": {
    type: Object,
    label: "Postal Address"
  },
 "postalAddress.city":{
    type:String,
    label:"City"
 },
  "postalAddress.country":{
    type:String,
    label:"Country"
  },

  "links": {
     type: [Object],
     label: "Links"
  },
  "links.$.name":{
    type: String,
    label: "Name"
  },
  "links.$.url":{
    type: String,
    label: "URL",
    regEx: SimpleSchema.RegEx.Url
  },
  "links.$.type": {
    type:String,
    label: "Type of URL",
    allowedValues: ['web', 'article','blog','facebook', 'twitter', 'instagram', 'blogger','linkedin','other','appStore','googlePlay','windowsStore'],
    autoform: {
      options: [
        //generic link types
        {label: "Web", value: "web"},
        {label: "Article", value: "article"},
        {label: 'Blog', value:"blog"},
        {label: "Other", value:"other"},
        //appstores
        {label: 'App Store', value:"appStore"},
        {label: 'Google Play', value:"googlePlay"},
        {label: 'Windows Store', value:"windowsStore"},
        //social media types
        {label: "Blogger", value: "blogger"},
        {label: "Facebook", value: "facebook"},
        {label: "Twitter", value: "twitter"},
        {label: "Instagram", value: "instagram"},
        {label: "Linkedin", value: "linkedin"}
      ]
    }
  },

  // The date the project was submitted to refugeetech platform
  "dateListed": {
    type: Date,
    label: "Date Listed",
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
});

Projects.attachSchema(ProjectsSchema);
