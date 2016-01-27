Meteor.publish("allTags", function () {
  // Get cursor to all tags
  return Tags.find();
});
