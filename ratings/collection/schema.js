/*  meta: {
    type: String,
    label: "An information store be used by the mighub frontend as a helper for when logins are not required to store identifying information about the one doing the rating so its possible to prevent the same  user to rate multiple times on the same thing. Can/Should be used to store nicknames or other info needed for proper frontend functionality.",
    blackbox: true // to be able to store anything => the meta key is frontend implementation specific
    //optional:false // as long as users are not required to log in to vote at least some metadata is required so the database doesnt get polluted with false content
  }
*/
Rater = new SimpleSchema({
  weakId: {
    type: String,
    label: "A weak identifier of the rater/commenter/reviewer", // has to be used as long as user login is not enforced",
    optional: false
  },
  id: {
    type: String,
    label: "The user id of the one rating",
    optional: true //initially mighub wont require logins
  }
});
Rated = new SimpleSchema({
  collection: {
    type: String,
    label: "In what collection does the document of the thing beeing rated reside",
    allowedValues: ["projects","comments","reviews"]    
  },
  id: {
    type: String,
    label: "the id of the thing the collection beeing rated"
  }
});

Ratings.attachSchema(new SimpleSchema({
  rated: {
    type: Rated
  },
  rating: {
    type: String,
    label: "UP or DOWN",
    allowedValues: ["UP","DOWN"]
  },
  rater: {
    type:Rater
  },
  date: {
    type: Date,
    label:"Timestamp of the rating",
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  }
}));
