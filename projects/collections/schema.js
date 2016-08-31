
/*** START: STUFF NOT CURRENTLY USED ***/

// CategoriesSchema = new SimpleSchema({
//   "categories": {
//     type: [String],
//     label: "Challenge Categories",
//     allowedValues: ['social', 'bureaucracy', 'housing', 'education',
//     'language', 'employment', 'coordination','information'],
//     autoform: {
//       options: [
//         {label: "Social", value: "social"},
//         {label: "Bureaucracy", value: "bureaucracy"},
//         {label: "Housing", value: "housing"},
//         {label: "Education", value: "education"},
//         {label: "Language", value: "language"},
//         {label: "Employment", value: "employment"},
//         {label: "Coordination", value: "coordination"},
//         {label: "Information", value: "information"}
//       ]
//     }
//   }
// });

// //helper schemas for the projectschema dataStore field
// ProjectMediaFileSchema = new SimpleSchema({
//   "id": {
//     type: String,
//     optional:true,
//     label: "File"
//   }
// });

// ProjectMediaLibrarySchema = new SimpleSchema({
//   files: {
//     type: [ProjectMediaFileSchema],
//     label: "List of files",
//     optional:true
//   }
// });

// KeyStakeHolderSchema = new SimpleSchema({ //temporary schema of a certain category of users that will be implemented in later iterations
//   name: {
//     type:String,
//     label: "The name of the stakeholder"
//   },
//   media: { //used to store logos/images etc of the stakeholders
//     type: ProjectMediaLibrarySchema,
//     label: "Media library for this stakeholder",
//     optional:true
//   },
//   description: {
//     type:String,
//     label: "Describes the stakeholders and its role in this project"
//   }
// });

// ProjectEventSchema = new SimpleSchema({
//   title: {
//     type:String,
//     label:"Title of this event"
//   },
//   date: {
//     type:Date,
//     label:"The date of the event",
//     autoform: {
//       afFieldInput: {
//         type: "bootstrap-datepicker",
//         "data-date-autoclose": "true"
//       }
//     }
//   },
//   description: {
//     type:String,
//     label:"Describe the event"
//   },
//   meta: {
//     type:[Object], // meta data about this event
//     optional:true
//   },
//   media: { //used to store logos/images etc of the event
//     type: ProjectMediaLibrarySchema,
//     label: "Media library for this event"
//   }
// });

// ProjectDataStoreSchema = new SimpleSchema({
//   //this schema is used to store lots of metadata about RT Projects, good for not polluting the ProjectsSchema with arbitrary/temporary fields
//   keyContributors: {
//     type:[KeyStakeHolderSchema],
//     label: "List of key contributors",
//     optional:true
//   },
//   problemOwners: {
//     type:[KeyStakeHolderSchema],
//     label: "List of Problem Owners",
//     optional:true
//   },
//   projectOwners: {
//     type:[KeyStakeHolderSchema],
//     label: "List of Project Owners",
//     optional:true
//   },
//   productOwners: {
//     type:[KeyStakeHolderSchema],
//     label: "List of Product Owners",
//     optional:true
//   },
//   history: {
//     type:[ProjectEventSchema],
//     label: "List of events",
//     optional:true

//   }
// });

/*** END: STUFF NOT CURRENTLY USED ***/
TranslationSchema = new SimpleSchema({
  field: {
    type: String,
    label: "Field to be translated",
    optional: false,
    allowedValues: ["description","name"],
    autoform: {
      options: [
        {label: "Project Description", value: "description"},
        {label: "Project Name", value: "name"}
      ]
    }
  },
  language: {
    type: String,
    label: "The language the field is translated to",
    optional: false,
    defaultValue: "sv",
    allowedValues: ["sv","en","fa","ar"], // TODO: check if these are the correct standardization for swedish, english, farsi, arabic
    autoform: {
      options: [
        {label: "Svenska", value: "sv"},
        {label: "English", value: "en"},
        {label: "Farsi", value: "fa"},
        {label: "Arabic", value: "ar"}
      ]
    }
  },
  translation: {
    type: String,
    label: "The tranlated content",
    optional: false
  }
});
// Schema for Projects collection
ProjectsSchema = new SimpleSchema({
  defaultLanguage: {
    type: String,
    label: "The base language the projects description and other fields is written in.",
    optional: false,
    defaultValue: "en",
    allowedValues: ["sv","en","fa","ar"], // TODO: check if these are the correct standardization for swedish, english, farsi, arabic
    autoform: {
      options: [
        {label: "Svenska", value: "sv"},
        {label: "English", value: "en"},
        {label: "Farsi", value: "fa"},
        {label: "Arabic", value: "ar"}
      ]
    }
  },
  "name": {
    type: String,
    label: "Project Name",
    optional: false,

  },
  "description": {
    type: String,
    label: "Project Description",
    optional: false
  },
  "shortDescription": {
    type: String,
    label: "A one sentence description of the Project (maximum 140 characters)",
    max: 140,
    optional:true
  },
  translations: {
    type: [TranslationSchema],
    optional: true
  },
  mainCategory: {
      type: String,
      label: "The main category this project belongs to",
      allowedValues: ['social', 'bureaucracy', 'housing', 'education',
      'language', 'employment', 'coordination','information','healthcare','media-and-communication'],
      optional: false,
      autoform: {
        options: [
          {label: "Social", value: "social"},
          {label: "Bureaucracy", value: "bureaucracy"},
          {label: "Housing", value: "housing"},
          {label: "Education", value: "education"},
          {label: "Language", value: "language"},
          {label: "Employment", value: "employment"},
          {label: "Coordination", value: "coordination"},
          {label: "Information", value: "information"},
          // new additions
          {label: "Media and Communication", value: "media-and-communication"},
          {label: "Healthcare", value: "healthcare"}
        ]
      }
  },
  "challengeCategories": {
    type: [String],
    label: "Other Challenge Categories this project is related to",
    allowedValues: ['social', 'bureaucracy', 'housing', 'education',
    'language', 'employment', 'coordination','information','healthcare','media-and-communication'],
    optional: true,
    autoform: {
      options: [
        {label: "Social", value: "social"},
        {label: "Bureaucracy", value: "bureaucracy"},
        {label: "Housing", value: "housing"},
        {label: "Education", value: "education"},
        {label: "Language", value: "language"},
        {label: "Employment", value: "employment"},
        {label: "Coordination", value: "coordination"},
        {label: "Information", value: "information"},
        // new additions
        {label: "Media and Communication", value: "media-and-communication"},
        {label: "Healthcare", value: "healthcare"}
      ]
    }
  },

  "tags": {
    type: [String],
    label: "Tags",
    optional:true
  },

  // The actual date the project began
  "startupDate": {
    type: Date,
    label: "Project Startup Date",
    optional:true,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker",
        "data-date-autoclose": "true"
      }
    }
  },
"targetPlatforms": {
    type: [String],
    label: "Target Platforms",
    optional: true,
    allowedValues: ['web', 'ios', 'android', 'windows-phone', 'other'],
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Web", value: "web"},
          {label: "iOS", value: "ios"},
          {label: "Android", value: "android"},
          {label: "Windows Phone", value: "windows-phone"},
          {label: "Other", value: "other"}
        ];
      }
    }
  },
  "links": {
    type: [Object],
    label: "Links",
    optional: true,
  },
  "links.$.type": {
    type:String,
    label: "Type of URL",
    allowedValues: ['home','pic','mainPic','logo','web', 'article','blog','facebook', 'twitter', 'instagram', 'blogger','linkedin','other','appStore','googlePlay','windowsStore','webApp','github','slack','trello'],
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
        {label: "Linkedin", value: "linkedin"},
		//dev
        {label: "Slack", value: "slack"},
        {label: "Github", value: "github"},
        {label: "Trello", value: "trello"},
    //pictures Step 0
        {label:"Project Pic", value:"mainPic"},
        {label:"Project Logo", value:"logo"},
        {label:"Picture", value:"pic"},
    //weblinks Step 0
        {label: "Home Page", value:"home"},
        {label: "Web App", value:"webApp"}
      ]
    }
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
  "postalAddress": {
    type: Object,
    label: "Postal Address",
    optional:true
  },
  "postalAddress.city":{
    type:String,
    label:"City",
    optional:true
  },
  "postalAddress.country":{
    type:String,
    label:"Country",
    optional:true
  },
  // AUTO: The date the project was submitted to refugeetech platform
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
  "migHubComplete": {
    type: Boolean,
    label: "Has this project a completely filled profile to be presented on the Setelin APP?",
    defaultValue: false
  },
  "upvotes": {
    type: Number,
    label: "vote count",
    defaultValue: 0
  }
  /*,
  media: {
    type: ProjectMediaLibrarySchema,
    label: "Project Media Library",
    optional:true
  },/*
  /*
  isRTProject: {
    type:Boolean,
    label: "Is this project a result of the Refugee Tech process?"
  },
  */
  /*,
  */
  /*
  "email": {
    type: String,
    label: "Project's email address",
    max: 100,
    optional:true
  },*/

  /*
  "solution": {
    type: Object,
    label: "Type of solution"
  },
  "solution.isTech":{
    type:Boolean,
    label:"Is this solution predominalty mediated by technology?"
  },
  "solution.description":{
    type:String,
    label:"Description of solution",
    max: 500
  },
  */

  // TODO: auto-associate user ID that created project
  // "contactPersonId": {
  //   type: String,
  //   label: "Contact Person ID",
  //   regEx: SimpleSchema.RegEx.Id,
  //   optional: true
  // },
  // TODO: Add 'Challenge' feature
  // "challengeDescription": {
  //   type: String,
  //   label: "Challenge Description"
  // },
  // "challengeCategories": {
  //   type: [String],
  //   label: "Challenge Categories"
  // },
/*
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
  */

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
  /*
  ,
  dataStore: { //this object will contain everything else about a project; currently only used for RT Projects
    type:ProjectDataStoreSchema,
    optional:true
  }*/
});

//Categories.attachSchema(CategoriesSchema);

Projects.attachSchema(ProjectsSchema);
