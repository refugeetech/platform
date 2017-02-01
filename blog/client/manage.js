import { Articles, Genres } from '../collections';

Template.manageArticles.onCreated(function bodyOnCreated() {
    var instance = this;
    instance.autorun(function() {
        Meteor.subscribe('allArticles');
    });
});

Template.manageArticles.helpers({
    articles() {
        return Articles.find();
    },
    formatDate(date) {
        return date.toLocaleDateString();
    },
    encodeTitle(title) {
        return encodeURIComponent(title);
    }
});

Template.manageArticles.events({
    'click .publish' () {
        Meteor.call('article.publish', this._id, this.isPublished);
    },
    'click .delete' () {
        Meteor.call('article.delete', this._id);
    }
});