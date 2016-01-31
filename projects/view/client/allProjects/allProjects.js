Template.allProjects.helpers({
   projects: ()=> Projects.find().fetch() 
});