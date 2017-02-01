import { Articles } from '../collections';

Template.article.onCreated(function() {
    const instance = this;
    instance.autorun(function() {
        instance.subscribe('singleArticle', decodeURIComponent(FlowRouter.getParam('title')));
    });

});

Template.article.helpers({
    article: function() {
        return Articles.findOne({ title: decodeURIComponent(FlowRouter.getParam('title')) });
    },
    formatDate(date) {
        return date.toLocaleDateString();
    },
    show(article) {
        //show unpublished articles only for contentAdmin users
        if (article) {
            if (!article.isPublished) {
                if (Roles.userIsInRole(Meteor.userId(), 'contentAdmin')) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
        return false;
    },
    currentURL() {
        return document.URL;
    }
});

Template.article.events({
    'click .btn-facebook, click .btn-twitter, click .btn-google-plus' (event) {
        var article = Articles.findOne({ title: decodeURIComponent(FlowRouter.getParam('title')) });
        Meteor.call('article.incrementShares', article._id);
    }
});