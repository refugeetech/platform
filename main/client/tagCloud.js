// will easy search to search by clicking on tag
Template.tagCloud.events({
  'click': (e) => {
	   console.log('sdf')
       //var projects = Projects.find({"tags"});
       var projects = ProjectsIndex.search($(e.target).val(), { limit: 5 }).fetch();
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