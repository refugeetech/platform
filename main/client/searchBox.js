Template.searchBox.helpers({
  projectsIndex: () => ProjectsIndex,
  getAttributes: {
      id:"search",
      placeholder:"What are you looking for?"
  },
  isNotAllProjectsRoute: function() {
      console.log(FlowRouter.current())
      console.log(FlowRouter.current().path != "/projects");
      return FlowRouter.current().path != "/projects";
  }
});
