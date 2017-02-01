import { Articles, Genres } from '../collections';

Template.blog.onCreated(function bodyOnCreated() {
    var instance = this;
    instance.autorun(function() {
        Meteor.subscribe('articles', Session.get('genre'));
    });
    Meteor.subscribe('genres');
});

Template.blog.helpers({
    articles() {
        return Articles.find();
    },
    formatDate(date) {
        if (date)
            return date.toLocaleDateString();
    },
    genres: function() {
        return Genres.find({});
    },
    encodeTitle(title) {
        return 'article/' + encodeURIComponent(title);
    }
});

Template.blog.events({
    'click #genres a' (event) {
        if ($(event.target).text() === 'All')
            Session.set('genre', undefined);
        else
            Session.set('genre', $(event.target).text());
        return false;
    }
});