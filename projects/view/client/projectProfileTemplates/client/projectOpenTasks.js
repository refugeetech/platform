Template.projectOpenTasks.helpers({
    //Using the Flowrouter package to get the route param projects/:projectId ; is set up in the Template.projectProfile.onCreated callback
    project: function() {
        return Projects.findOne({
            _id: FlowRouter.getParam('projectId')
        });
    },
    spitMeAnURL: function(list, type) {
        return _.findWhere(list, {
            type: type
        }).url;
    },
    isLinkNotEmpty: function(list, type) {
        var url = _.findWhere(list, {
            type: type
        }).url;
        return !_.isEmpty(url);
    }
});

Template.trelloLists.helpers({
    spitMeTrelloURL: function(list) {
        return _.findWhere(list, {
            type: 'trello'
        }).url;
    },
    getData: function(url) {
        //url = "https://api.trello.com/1/boards/rbpEfMld";
        url = trelloUrlParser(url);
        Meteor.http.call("GET", url, function(error, result) {
            if (error) {
                console.log("ProjectOpenTasks.js >getDataTrello >Error:" + error);
            }
            if (result) {
                //limit result to the first 5 issues.
                //because we can only get the result in callback we can't
                //directly return it, so we're storing it in the Session...
                Session.set("trelloLists", _.first(result.data, 5));
            }
        });
        return Session.get("trelloLists");
    },
});

//trying to parse and fix trello url
function trelloUrlParser(url) {
    //https://trello.com/b/rbpEfMld/data-science
    if (url.includes("trello.com")) {
        if (!url.includes("http"))
            url = "https://" + url;
        url = url.replace("http://", "https://");
        url = url.replace("https://www", "https://");
        url = url.replace("https://trello.com/b", "https://api.trello.com/1/boards");
        //delete the humain readable name (data-science)
        url = url.substr(0, url.lastIndexOf("/"));
        url = url + "/lists";
        return url;
    }
}

Template.githubIssues.helpers({
    spitMeGithubURL: function(list) {
        return _.findWhere(list, {
            type: 'github'
        }).url;
    },
    getData: function(url) {
        //url = "https://api.github.com/repos/frabcus/house/issues?status=opened";
        url = githubUrlParser(url);
        Meteor.http.call("GET", url, function(error, result) {
            if (error) {
                console.log("ProjectOpenTasks.js >getDataGitub >Error:" + error);
            }
            if (result) {
                //limit result to the first 5 issues.
                //because we can only get the result in callback we can't
                //directly return it, so we're storing it in the Session...
                Session.set("issuesList", _.first(result.data, 5));
            }
        });
        return Session.get("issuesList");
    },
});

//trying to parse and fix the url
function githubUrlParser(url) {
    if (url.includes("github.com")) {
        if (!url.includes("http"))
            url = "https://" + url;
        url = url.replace("http://", "https://");
        url = url.replace("https://www", "https://");
        url = url.replace("https://", "https://api.");
        if (url.endsWith("/")) {
            url = url + "issues?status=opened";
        } else {
            url = url + "/issues?status=opened";
        }
        url = url.replace("github.com/", "github.com/repos/");
        return url;
    }
}


Template.githubIssuesTableRow.helpers({
    getLabels: function(lab) {
        var labels = "";
        for(var i=0;i<lab.length;i++){
           labels =labels + lab[i].name + ", ";
        }
        //delete the last ', '
        labels = labels.substring(0, labels.length - 2);
        return labels;
    },
});

Template.githubIssuesTableRow.events({
    "click .githubIssueRow": function(event, template) {
        //open issue link
        window.open(this.html_url, "_blank");
    }
});
