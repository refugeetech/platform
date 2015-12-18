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
    label: "Project Short (maximum 140 characters)",
    max: 140
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
  // TODO: Add links object with sub fields
  // "links": {
  //   type: [String],
  //   label: "Links"
  // }
  // TODO: Add 'Requests' feature
  // "requestIds": {
  //   type: [String],
  //   label: "Request IDs",
  //   regEx: SimpleSchema.RegEx.Id,
  //   optional: true
  // }
  "dateListed": {
    type: Date,
    label: "Date Listed",
    autoValue: function() {
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
