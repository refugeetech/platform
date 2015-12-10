// Schema for ProblemCategories collection
ProblemCategoriesSchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Category name"
  },
  "description": {
    type: String,
    label: "Category Description" 
  },
  "summary": {
    type: String,
    label: "Category Summary",
    max: 500 // same as for projectSummary
  },
  "short": {
    type: String,
    label: "Category tweet size description",
    max: 140
  }
});

ProblemCategories.attachSchema(ProblemCategoriesSchema);