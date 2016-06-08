Reviewer = new SimpleSchema({
  // meta: {
  //   type: Object,
  //   label: "An information store be used by the mighub frontend as a helper for when logins are not required to store identifying information about the one doing the review so its possible to prevent the same  user to review the same project multiple times using different aliases. Can/Should be used to store nicknames or other info needed for proper frontend functionality.",
  //   blackbox: true, // to be able to store anything => the meta key is frontend implementation specific
  //   optional:false // as long as users are not required to log in to review at least some metadata is required so the database doesnt get polluted with false content
  // },
  weakId: {
    type: String,
    label: "Used to weakly identify the rater/commenter/reviewer as long as user login is not enforced",
    optional: false
  },
  id: {
    type: String,
    label: "The user id of the one reviewing",
    optional: true //initially mighub wont require logins
  }
});
Reviewed = new SimpleSchema({
  collection: {
    type: String,
    label: "The collection of the object beeing reviewed",
    allowedValues: ["projects"] //  only projects can be reviewed at the moment  as there are no other relevant entities at the moment
  },
  id: {
    type: String,
    label: "the id of the thing in the collection beeing reviewed"
  }
});
Reviews.attachSchema(new SimpleSchema({
  reviewer: {
    type: Reviewer
  },
  text: {
    type: String,
    label: "The content of the review",
    min: 50 // a review is more than a comment and to be useful it should have some minimum number of letters
  },
  reviewed: {
    type:Reviewed
  },
  approved: {
    type: Boolean,
    label:"Overrides autoApproved and is set by moderator if necessary.",
    defaultValue: true
  },
  // This is used to self moderate the content on the mighub. If enough users thinks a review is inappropriate (by downvoting) then the comment needs to be reviewed by a moderator to be visible, through the approved field, since the autoApproved will return false
  autoApproved: {
    type: Boolean,
    label: "Is this comment approved?",
    autoValue: ()=> {
      const maxNumberOfDownVotes = 10;
      return _.filter(Reviews.find({rated:{collection:"reviews", id:this.field("_id")}}).fetch(),(rating,index)=>{return rating.rating=='DOWN';}).length >= maxNumberOfDownVotes;
    }
  },
  nbrUpVotes: {
    type: Number,
    label: "Number of upvotes",
    autoValue: ()=> {
      return _.filter(Ratings.find({rated:{collection:"reviews", id:this.field("_id")}}).fetch(),(rating,index)=>{return rating.rating=='UP';}).length;
    }
  },
  nbrDownVotes: {
    type: Number,
    label: "Number of upvotes",
    autoValue: ()=> {
      return _.filter(Ratings.find({rated:{collection:"reviews", id:this.field("_id")}}).fetch(),(rating,index)=>{return rating.rating=='DOWN';}).length;
    }
  },
  date: {
    type: Date,
    label:"Timestamp of the review",
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
