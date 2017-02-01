export var ArticleSchema = new SimpleSchema({
    title: {
        type: String,
        max: 100
    },
    subtitle: {
        type: String,
        max: 100
    },
    postedOn: {
        type: Date,
    },
    genre: {
        type: String
    },
    articleTags: {
        type: [String],
        minCount: 1
    },
    content: {
        type: String
    },
    featuredImage: {
        type: String
    },
    shares: {
        type: Number,
        min: 0,
        defaultValue: 0
    },
    isPublished: {
        type: Boolean
    },
    updatedOn: {
        type: Date,
        optional: true
    }
});