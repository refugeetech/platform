Ratings = Mongo.Collection.get('ratings');
if(!Ratings) {
    Ratings = new Mongo.Collection('ratings');
}
