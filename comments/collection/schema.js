Commenter = new SimpleSchema({
  // meta: {
  //   type: Object,
  //   label: "An information store be used by the mighub frontend as a helper for when logins are not required to store identifying information about the one doing the comment so its possible to prevent the same  user to rate multiple times on the same thing. Can/Should be used to store nicknames or other info needed for proper frontend functionality.",
  //   blackbok: true, // to be able to store anything => the meta key is frontend implementation specific
  //   optional:false // as long as users are not required to log in to vote at least some metadata is required so the database doesnt get polluted with false content
  // },
  weakId: {
    type: String,
    label: "Used to weakly identify the rater/commenter/reviewer as long as user login is not enforced",
    optional: false
  },
  id: {
    type: String,
    label: "The user id of the one commenting",
    optional: true //initially mighub wont require logins
  }
});
Commented = new SimpleSchema({
  collection: {
    type: String,
    label: "In what collection does the document of the thing beeing commented reside",
    allowedValues: ["projects"] // only projects can be commented on at the moment    
  },
  id: {
    type: String,
    label: "the id of the thing the collection beeing rated"
  }
});
Comments.attachSchema(new SimpleSchema({
  commenter: {
    type:Commenter,
    optional: false
  },
  commented: {
    type: Commented,
    optional: false
  },
  text: {
    type: String,
    label: "the content of the comment",
    optional: false,
    min:1
  },
  approved: {
    type: Boolean,
    label:"Overrides autoApproved and is set by moderator if necessary.",
    defaultValue: true
  },
  autoApproved: {
    type: Boolean,
    label: "Is this comment approved?",
    autoValue: ()=> {
      const maxNumberOfDownVotes = 5;
      return _.filter(Comments.find({rated:{collection:"comments", id:this.field("_id")}}).fetch(),(rating,index)=>{return rating.rating=='DOWN';}).length >= maxNumberOfDownVotes;
    }
  },
  nbrUpVotes: {
    type: Number,
    label: "Number of upvotes",
    autoValue: ()=> {
      return _.filter(Ratings.find({rated:{collection:"comments", id:this.field("_id")}}).fetch(),(rating,index)=>{return rating.rating=='UP';}).length;
    }
  },
  nbrDownVotes: {
    type: Number,
    label: "Number of upvotes",
    autoValue: ()=> {
      return _.filter(Ratings.find({rated:{collection:"comments", id:this.field("_id")}}).fetch(),(rating,index)=>{return rating.rating=='DOWN';}).length;
    }
  },
  date: {
    type: Date,
    label:"Timestamp of the Comment",
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
