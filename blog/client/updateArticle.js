import { Articles, ArticleTags, Genres } from '../collections';

Template.updateArticle.onCreated(function bodyOnCreated() {
    Meteor.subscribe('singleArticle', decodeURIComponent(FlowRouter.getParam('title')));
    Meteor.subscribe('articleTags');
    Meteor.subscribe('genres');
});

Template.updateArticle.helpers({
    article: function() {
        return Articles.findOne({ title: decodeURIComponent(FlowRouter.getParam('title')) });
    },
    genres: function() {
        return Genres.find({});
    },
    articleTags: function() {
        return ArticleTags.find({});
    },
    formatDate(date) {
        return date.toLocaleDateString();
    },
    inTags: function(tag) {
        var article = Articles.findOne({ title: decodeURIComponent(FlowRouter.getParam('title')) });
        return $.inArray(tag, article.articleTags);
    },
    isEqual: function(a, b) {
        return a === b;
    }
});

Template.updateArticle.events({
    'submit #updateArticleForm' (event) {
        event.preventDefault();

        //serialize form
        var article = Articles.findOne({ title: decodeURIComponent(FlowRouter.getParam('title')) });
        $.each($('#updateArticleForm').serializeArray(), function() {
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

        //update
        var isInserted = Meteor.call('article.update', article);

        FlowRouter.go('/blog');

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