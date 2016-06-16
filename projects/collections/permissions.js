Projects.allow({
  insert: function () {
    return true;
  },
  update: function(userId, docs, fields, modifier){
    if(Meteor.isServer) {
      console.log("servasdasds");
    }
    console.log({userId:userId, docs:docs, fields:fields, modifier: modifier});
    return true;
  }
});
