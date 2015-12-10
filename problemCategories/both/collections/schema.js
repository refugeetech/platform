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
    label: "Category Summary"
  },
  "short": {
    type: String,
    label: "Problem Categories"
  }
});

ProblemCategories.attachSchema(ProblemCategoriesSchema);