Template.projectOpenTasks.helpers({
    //Using the Flowrouter package to get the route param projects/:projectId ; is set up in the Template.projectProfile.onCreated callback
    project: function() {
        return Projects.findOne({
            _id: FlowRouter.getParam('projectId')
        });
    },
    isListEmpty: function(list, typ) {
        console.log("--->",list);
        var urlList = _.where(list, {
            type: typ
        });
        if(typ=="github"){
          Session.set("githubLinksCount",urlList.length);
        }
        return !_.isEmpty(urlList);
    },
    getGithubRepos: function(list) {
        var lis = _.where(list, {
            type: 'github'
        });
        return lis;
    },
    getIssuesCount: function(list){
      var url = githubIssuesUrlParser(list.url);
      Meteor.http.call("GET", url, function(error, result) {
          if (error) {
              console.log("ProjectOpenTasks.js >getDataGitub >Error:" + error);
          }
          if (result) {
              Session.set("issuesListCount"+url,result.data.length);
          }
      });
      return Session.get("issuesListCount"+url);
    },
    showRepo: function(issuesCount){
      if(issuesCount==0 && Session.get("githubLinksCount")!=1){
        return false;
      }else{
        return true;
      }
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

Template.githubRepo.helpers({
    getIssues: function(url) {
        //url = "https://api.github.com/repos/frabcus/house/issues?status=opened";
        url = githubIssuesUrlParser(url);
        Meteor.http.call("GET", url, function(error, result) {
            if (error) {
                console.log("ProjectOpenTasks.js >getDataGitub >Error:" + error);
            }
            if (result) {
                //limit result to the first 5 issues.
                //because we can only get the result in callback we can't
                //directly return it, so we're storing it in the Session...
                Session.set("issuesList"+url, _.first(result.data, 5));
            }
        });
        return Session.get("issuesList"+url);
    },
    getRepoName: function(url){
      url = githubRepoNameUrlParser(url);
      Meteor.http.call("GET", url, function(error, result) {
          if (error) {
              console.log("ProjectOpenTasks.js >getDataGitub >Error:" + error);
          }
          if (result) {
              //limit result to the first 5 issues.
              //because we can only get the result in callback we can't
              //directly return it, so we're storing it in the Session...
              // Session.set("repoName"+url, result.data.name);
              Session.set("repoName"+url, result.data.full_name);
          }
      });
      return Session.get("repoName"+url);
    },
    showRepoName: function(){
      if(Session.get("githubLinksCount")>1){
        return true
      }else{
        return false;
      }
    }
});

Template.githubIssuesTableRow.helpers({
    getLabels: function(lab) {
        var labels = "";
        for (var i = 0; i < lab.length; i++) {
            labels = labels + lab[i].name + ", ";
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

//trying to parse and fix the url
function githubIssuesUrlParser(url) {
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

//trying to parse and fix the url
function githubRepoNameUrlParser(url) {
    if (url.includes("github.com")) {
        if (!url.includes("http"))
            url = "https://" + url;
        url = url.replace("http://", "https://");
        url = url.replace("https://www", "https://");
        url = url.replace("https://", "https://api.");
        url = url.replace("github.com/", "github.com/repos/");
        return url;
    }
}
