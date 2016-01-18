// Schema for ProblemCategories collection
ProblemCategoriesSchema = new SimpleSchema({
  "name": {
    type: String,
    label: "The name of this category"
  },
  "description": { // A problem category needs a description because there is alot of background information that the category is supposed to abstract. This information is found through our crowdsourcing activities and through our workshops and focus groups.
    type: String,
    label: "Backgroundinformation and longer description of this problem cateogry",
  },
  "short": { // short is good to have when the nature of this problem category needs to be communicated in very few words.
    type: String,
    label: "Short description of this problem category",
    max: 140
  }
});

ProblemCategories.attachSchema(ProblemCategoriesSchema);