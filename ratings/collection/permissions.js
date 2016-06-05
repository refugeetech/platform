Ratings = new Mongo.Collection("ratings");
Ratings.allow({
  insert: function () {
    return true;
  }
});
