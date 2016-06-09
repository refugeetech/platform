Meteor.publish("allRatings", function () {
  // Get cursor to all ratings
  return Ratings.find();
});
