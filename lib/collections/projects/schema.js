// Schema for Projects collection
ProjectsSchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Project Name"
  },
  "projectDescription": {
    type: String,
    label: "Project Description"
  },
  "projectSummary": {
    type: String,
    label: "Project Summary"
  },
  "contactPersonId": {
    type: String,
    label: "Contact Person ID",
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  "problemDescription": {
    type: String,
    label: "Problem Description"
  },
  "problemCategories": {
    type: [String],
    label: "Problem Categories"
  },
  "tags": {
    type: [String],
    label: "Tags"
  },
  "teamIds": {
    type: [String],
    label: "Team IDs",
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  "teamDescription": {
    type: String,
    label: "Team Description"
  },
  "currentStage": {
    type: String,
    label: "Current Stage"
  },
  "projectShort": {
    type: String,
    label: "Project Short"
  },
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
  "startupDate": {
    type: Date,
    label: "Startup Date"
  },
  "targetGroups": {
    type: [String],
    label: "Target Groups"
  },
  "targetLocations": {
    type: [String],
    label: "Target Locations"
  },
  "targetPlatforms": {
    type: [String],
    label: "Target Platforms"
  },
  "address": {
    type: String,
    label: "Address"
  },
  "links": {
    type: [String],
    label: "Links"
  },
  "requestIds": {
    type: [String],
    label: "Request IDs",
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  }
});

Projects.attachSchema(ProjectsSchema);
