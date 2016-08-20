  RatingsApiV01 = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    version:'v01',
    defaultHeaders: {'Content-Type': 'application/json'}
  });  
  
  // Generates: GET, POST on /api/v01/ratings and GET, PUT, DELETE on
  // /api/v01/ratings/:id for the Ratings collection
  Ratings = Mongo.Collection.get('ratings');
  if(!Ratings) {
    Ratings = new Mongo.Collection('ratings');
  }
  //RatingsApiV01.addCollection(Ratings);
  
 


