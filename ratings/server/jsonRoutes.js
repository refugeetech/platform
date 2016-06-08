/* STUB */
/////////////// GET RATINGS FOR A PROJECT ///////////////
JsonRoutes.add("get", "/reviews/projects/:projectId/json", function (req, res, next) {
  var reviewId = req.params.reviewId; // The review id, in MongoDB
  var result = Reviews.findOne(reviewId); 

  JsonRoutes.sendResult(res, 200,
/* API RESPONSE */
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:'review'
      },
      pseudoQuery:'return review in Reviews where ['+req.params.reviewId+'] equals review._id'
    },
    data:result
    
  }); 
});

/* STUB */
/////////////// GET RATINGS FOR A COMMENT ///////////////
JsonRoutes.add("get", "/reviews/comments/:commentId/json", function (req, res, next) {
  var reviewId = req.params.reviewId; // The review id, in MongoDB
  var result = Reviews.findOne(reviewId);

  JsonRoutes.sendResult(res, 200,
/* API RESPONSE */
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:'review'
      },
      pseudoQuery:'return review in Reviews where ['+req.params.reviewId+'] equals review._id'
    },
    data:result
    
  }); 
});

/* STUB */
/////////////// GET RATINGS FOR A REVIEW ///////////////
JsonRoutes.add("get", "/ratings/reviews/:reviewId/json", function (req, res, next) {
  var reviewId = req.params.reviewId; // The review id, in MongoDB
  var result = Reviews.findOne(reviewId);

    JsonRoutes.sendResult(res, 200,
  /* API RESPONSE */
    {
      meta:
      {
        schemaDescription:
        {
          fieldDescription:'',
          dataStructure:'review'
        },
        pseudoQuery:'return review in Reviews where ['+req.params.reviewId+'] equals review._id'
      },
      data:result
  
  });

});
/* STUB */
////////// GET ALL RATINGS RELATED TO A PROJECT ////////////////
JsonRoutes.add("get", "/ratings/projects/:projectId/nested/json", function (req, res, next) {
  var reviewId = req.params.reviewId; // The review id, in MongoDB
  var result = Reviews.findOne(reviewId);

  JsonRoutes.sendResult(res, 200,
/* API RESPONSE */
  {
    meta:
    {
      schemaDescription:
      {
        fieldDescription:'',
        dataStructure:'review'
      },
      pseudoQuery:'return review in Reviews where ['+req.params.reviewId+'] equals review._id'
    },
    data:result

});
  
});


////////////// INSERT RATING //////////////
// collection=projects&documentId=koAeSLKJb9AjWALaq&rating=UP&weakId=leo/json
// collection=reviews&documentId=4LHJ6tgYAJaR3CHS9&rating=DOWN&weakId=leo&reviewerId=leo/json
//parameter syntax: collection=:collection&documentId=:documentId&rating=:rating&raterId=:raterId&weakId=:weakId
JsonRoutes.add("get", "/ratings/put/:reqstring/json", function (req, res, next) {
  var tmp = req.params.reqstring.split("&");
  console.log(tmp);
  _.each(tmp,(str,i)=> {
    const tmp3 = str.split("=");
    req.params[tmp3[0]]=tmp3[1];
  });
  console.log(req.params);
  var CollectionMap = {projects:Projects, reviews:Reviews, comments:Comments};
  var doc = CollectionMap[req.params.collection].findOne({_id:req.params.documentId});
  if(doc === undefined) {
    JsonRoutes.sendResult(res, 400,
    /* API RESPONSE */
    {
      error: 400,
      reason: "Reviewed document with id="+req.params.documentId + ", in collection "+ req.params.collection + " does not exist"
    });
  }
  else {
    
    var id;
    try {
      id = Ratings.insert({rater: {weakId:req.params.weakId, id:req.params.raterId},
      rated:{collection:req.params.collection,id:req.params.documentId},
      rating:req.params.rating});
    }
    catch(e) {
      
    }
    if(id === undefined) {
      JsonRoutes.sendResult(res, 400,
      /* API RESPONSE */
      {
        error: 400,
        reason: "An error occured creating the document"
      });
    }
    else {
      count = Ratings.find({rated:{collection:req.params.collection, id:req.params.documentId},rating:req.params.rating}).fetch().length;
    
      JsonRoutes.sendResult(res, 200,
      /* API RESPONSE */
      {
        meta:
        {
          schemaDescription:
          {
            fieldDescription:{
              collection: 'The collectin of the document beeing rated',
              documentId: 'the documentId of the document beeing rated',
              rating: 'type of the rating inserted' ,
              count: 'the current number of ratings for the rated object with rated type'
            },
            dataStructure:
            {
              collection: 'collection',
              documentId: 'document._id',
              rating: 'rating.type' ,
              count: 'rated.nbrDownVotes/nbrUpvotes'
            }
          },
          pseudoQuery:'return review._id for the created review'
        },
        data: {
          collection: req.params.collection,
          documentId: req.params.documentId,
          rating: req.params.rating,
          count: count
        }
      });
    }
  }

});