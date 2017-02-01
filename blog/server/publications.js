import { ArticleSchema } from './schema';
import { Articles, ArticleTags, Genres } from '../collections';

Meteor.publish('articles', function articlePublication(genreFilter) {
    if (!genreFilter || _.isEmpty(genreFilter)) {
        return Articles.find({ isPublished: true });
    } else {
        return Articles.find({ isPublished: true, genre: genreFilter });
    }
});

Meteor.publish("singleArticle", function(titleArg) {
    var data = Articles.find({ title: titleArg });
    if (data)
        return data;
    else
        return this.ready();
});

Meteor.publish("allArticles", function() {
    return Articles.find({});
});

Meteor.publish("articleTags", function() {
    return ArticleTags.find({});
});

Meteor.publish("genres", function() {
    return Genres.find({});
});

Meteor.methods({
    'articles.insert' (article) {



        //clean and check against schema
        ArticleSchema.clean(article);
        check(article, ArticleSchema);

        //insert
        Articles.insert(article);

        return true;
    },
    'article.publish' (id, publish) {
        check(publish, Boolean)
        Articles.update(id, {
            $set: { isPublished: !publish },
        });
    },
    'article.delete' (id) {
        Articles.remove(id);
    },
    'article.update' (article) {

        article.updatedOn = new Date();

        //clean and check against schema
        ArticleSchema.clean(article);
        check(article, ArticleSchema);

        console.log(">>>", article.postedOn);

        //update
        Articles.update(article._id, {
            $set: {
                title: article.title,
                subtitle: article.subtitle,
                postedOn: article.postedOn,
                genre: article.genre,
                articleTags: article.articleTags,
                content: article.content,
                featuredImage: article.featuredImage,
                isPublished: article.isPublished,
                updatedOn: article.updatedOn
            },
        });
    },
    'article.incrementShares' (id) {
        Articles.update(id, {
            $inc: {
                shares: 1
            },
        });
    },
    'articleTags.insert' (tag) {
        check(tag, String)
        if (ArticleTags.find({ 'articleTag': tag }).count() === 0) {
            ArticleTags.insert({ 'articleTag': tag });
            return true;
        } else
            return false;
    },
    'genres.insert' (genre) {
        check(genre, String)
        if (Genres.find({ 'genre': genre }).count() === 0) {
            Genres.insert({ 'genre': genre });
            return true;
        } else
            return false;
    }
});