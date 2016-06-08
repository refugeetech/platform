////////////// GET SINGLE REVIEW //////////////
//  return a single JSON object containing the specified review.
JsonRoutes.add("get", "/reviews/:reviewId/json", function (req, res, next) {
  var reviewId = req.params.reviewId; // The review id, in MongoDB
  var result = Reviews.findOne(reviewId) 

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


////////////// INSERT REVIEW //////////////
// collection=projects&reviewedId=koAeSLKJb9AjWALaq&text=All reviews has to be at least 50 characters in  length or else...&weakId=leo

//parameter syntax: collection=:collection&reviewedId=:reviewedId&text=:text&reviewerId=:reviewerId&weakId=:weakId
JsonRoutes.add("get", "/reviews/put/:reqstring/json", function (req, res, next) {
  var tmp = req.params.reqstring.split("&");
  console.log(tmp);
  _.each(tmp,(str,i)=> {
    const tmp3 = str.split("=");
    req.params[tmp3[0]]=tmp3[1];
  });
  console.log(req.params);
  var project = Projects.findOne({_id:req.params.reviewedId});
  console.log(project);
  if(project === undefined) {
    
    result = 

    //throw new Error("Document with id="+req.params.reviewedId + ", in collection "+ req.params.collection + " does not exist")
      JsonRoutes.sendResult(res, 400,
/* API RESPONSE */
    {
      error: 400,
      reason: "Reviewed object with id="+req.params.reviewedId + ", in collection "+ req.params.collection + " does not exist"
    });
  }
  else {
    var reviewId = Reviews.insert({reviewer: {weakId:req.params.weakId, id:req.params.reviewerId},
    reviewed:{collection:req.params.collection,id:req.params.reviewedId},
    text:req.params.text});
    JsonRoutes.sendResult(res, 200,
    /* API RESPONSE */
    {
      meta:
      {
        schemaDescription:
        {
          fieldDescription:{
            reviewId:"The id of the newly created review document in the reviews collection"
          },
          dataStructure:
          {
            reviewId: 'review._id'
          }
        },
        pseudoQuery:'return review._id for the created review'
      },
      data:
      {
        reviewId: reviewId
      }
    });
  }

});