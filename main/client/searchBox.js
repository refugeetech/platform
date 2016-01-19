Template.searchBox.helpers({
  projectsIndex: () => ProjectsIndex
});

Template.searchBox.events({
  'click': (e) => {
    // index instanceof EasySearch.index
    console.log(ProjectsIndex.search($(e.target).val(), { limit: 5 }).fetch())  
  }
});

Template.searchBox.helpers({
   tag: function() {
       //var projects = Projects.find({"tags"});
       var projects = Projects.find().fetch();
       var cloud = [];
       projects.forEach(function(project) {
           project.tags.forEach(function(tag) {
               if(cloud.indexOf(tag)===-1) {
                   cloud.push({text:tag});
               }
           });
       });
       return cloud;
       
   } 
});