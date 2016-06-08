////////////// INSERT RATING //////////////
// collection=projects&ratedId=koAeSLKJb9AjWALaq&rating=UP&weakId=leo
//collection=:collection&ratedId=:ratedId&rating=:rating&raterId=:raterId&weakId=:weakId
JsonRoutes.add("get", "/ratings/put/:reqstring/json", function (req, res, next) {
  var tmp = req.params.reqstring.split("&");
  console.log(tmp);
  _.each(tmp,(str,i)=> {
    const tmp3 = str.split("=");
    req.params[tmp3[0]]=tmp3[1];
  });
  console.log(req.params);
  var project = Projects.findOne({_id:req.params.ratedId});
  if(project === null) {
    result = -1;
  }
  else {
    var status = Ratings.insert({rater: {weakId:req.params.weakId, id:req.params.raterId},
    rated:{collection:req.params.collection,id:req.params.ratedId},
    rating:req.params.rating});
    if(status === null) {
      result = -1;
    }
    else {
      result = Ratings.find({rated:{collection:req.params.collection, id:req.params.ratedId},rating:req.params.rating}).fetch().length;
    }
  }
  //console.log("result="+result);
  JsonRoutes.sendResult(res, 200,
/* API RESPONSE */
  {
    data:result //returns -1 if failed else the current number of ratings of the voted type for the rated object
  });

});