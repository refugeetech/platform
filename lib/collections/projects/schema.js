// Schema for Projects collection
ProjectsSchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Name"
  },
  "contactPersonId": {
    type: String,
    label: "Contact Person ID",
    regEx: SimpleSchema.RegEx.Id
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
    regEx: SimpleSchema.RegEx.Id
  },
  "teamDescription": {
    type: String,
    label: "Team Description"
  },
  "currentStage": {
    type: String,
    label: "Current Stage"
  },
  "projectDescription": {
    type: String,
    label: "Project Description"
  },
  "projectSummary": {
    type: String,
    label: "Project Description"
  },
  "projectShort": {
    type: String,
    label: "Project Short"
  },
  "dateListed": {
    type: Date,
    label: "Date Listed"
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
    regEx: SimpleSchema.RegEx.Id
  }
});

Projects.attachSchema(ProjectsSchema);