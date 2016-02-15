Template.searchBox.helpers({
  projectsIndex: () => ProjectsIndex,
  getAttributes: {
    id:"search",
    placeholder:"What are you looking for?"
  },
  shouldShowAutoSuggestions: function() {
    // when the route is on the all projects page searchbox will filter the page, therefore autosuggestion is not necessary
    return Session.get('willShowAutoSuggestion') && !(FlowRouter.current().path == '/projects');
  }
});
