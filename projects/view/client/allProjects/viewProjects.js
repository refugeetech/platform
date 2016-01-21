// Filters searchResult when category-filter dropdown value is changed
Template.viewProjects.events({
  'change .category-filter': function (e) {
    ProjectsIndex.getComponentMethods()
      .addProps('categoryFilter', $(e.target).val());
  }
  // 'change .location-filter': function (e) {
  //   ProjectsIndex.getComponentMethods()
  //     .addProps('locationFilter', $(e.target).val());
  // }
});
