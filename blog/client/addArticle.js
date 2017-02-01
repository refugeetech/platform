//rich text editor:
// https://github.com/froala/froala-reactive
import { ArticleTags, Genres } from '../collections';

Template.addArticle.onCreated(function bodyOnCreated() {
    Meteor.subscribe('articleTags');
    Meteor.subscribe('genres');
});

Template.addArticle.helpers({
    genres: function() {
        return Genres.find({});
    },
    articleTags: function() {
        return ArticleTags.find({});
    }
});

Template.addArticle.events({
    'submit #addArticleForm' (event) {
        event.preventDefault();

        //serialize form
        var article = {};
        $.each($('#addArticleForm').serializeArray(), function() {
            if (this.name !== 'articleTags')
                return article[this.name] = this.value;
            else {
                if (!Array.isArray(article[this.name]))
                    article[this.name] = new Array();
                return article[this.name].push(this.value);
            }
        });

        //get content as html
        article.content = $('.froala-reactive-meteorized').froalaEditor('html.get');

        //set isPublished to its boolean value
        if (article.publishMe === 'on')
            article.isPublished = true;
        else
            article.isPublished = false;

        var isInserted = Meteor.call('articles.insert', article);

        FlowRouter.go('/blog');
        // if (isInserted) {
        //     FlowRouter.go('/blog');
        // }
    },
    'click .addGenre' (event) {
        var genreToAdd = $('#addedGenre').val();
        Meteor.call('genres.insert', genreToAdd);
        $('#addedGenre').val('');
    },
    'click .addTag' (event) {
        var tagToAdd = $('#addedTag').val();
        Meteor.call('articleTags.insert', tagToAdd);
        $('#addedTag').val('');
    }
});