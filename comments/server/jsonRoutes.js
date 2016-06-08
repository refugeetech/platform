////////////// GET SINGLE COMMENT //////////////
//  return a single JSON object containing the specified project.
JsonRoutes.add("get", "/comments/:commentId/json", function (req, res, next) {
  var commentId = req.params.commentId; // The review id, in MongoDB
  var result = Reviews.findOne(commentId) 

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
      pseudoQuery:'return comment in Comments where ['+req.params.commentId+'] equals comment._id'
    },
    data:result
    
  }); // Sends the result to client
  
});


////////////// INSERT COMMENT //////////////
// collection=projects&objectId=koAeSLKJb9AjWALaq&text=All comments builds community&weakId=leo

//collection=:collection&commentedId=:reviewedId&text=:text&reviewerId=:reviewerId&weakId=:weakId
JsonRoutes.add("get", "/comments/put/:reqstring/json", function (req, res, next) {
  var tmp = req.params.reqstring.split("&");
  console.log(tmp);
  _.each(tmp,(str,i)=> {
    const tmp3 = str.split("=");
    req.params[tmp3[0]]=tmp3[1];
  });
  console.log(req.params);
  var project = Projects.findOne({_id:req.params.objectId});
  console.log(project);
  if(project === undefined) {
    
    result = 

    //throw new Error("Document with id="+req.params.reviewedId + ", in collection "+ req.params.collection + " does not exist")
      JsonRoutes.sendResult(res, 400,
/* API RESPONSE */
    {
      error: 400,
      reason: "Reviewed object with id="+req.params.objectId + ", in collection "+ req.params.collection + " does not exist"
    });
  }
  else {
    var commentId = Comments.insert({commenter: {weakId:req.params.weakId, id:req.params.userId},
    reviewed:{collection:req.params.collection,id:req.params.reviewedId},
    text:req.params.text});
    result = Comments.find({reviewed:{collection:req.params.collection, id:req.params.objectId}}).fetch();
      JsonRoutes.sendResult(res, 200,
    /* API RESPONSE */
      {
        meta:
        {
          schemaDescription:
          {
            fieldDescription:{
              commentId:"The id of the newly created comment in the comments collection"
            },
            dataStructure:
            {
              commentId: 'comment._id'
            }
          },
          pseudoQuery:'return comment._id for the created comment'
        },
        data:
        {
          commentId: commentId
        }
      });
  }

});