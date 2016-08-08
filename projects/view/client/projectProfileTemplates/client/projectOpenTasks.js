Template.projectOpenTasks.helpers({
    //Using the Flowrouter package to get the route param projects/:projectId ; is set up in the Template.projectProfile.onCreated callback
    project: function() {
        return Projects.findOne({
            _id: FlowRouter.getParam('projectId')
        });
    },
    isListEmpty: function(list, typ) {
        var urlList = _.where(list, {
            type: typ
        });
        if(typ=="github"){
          Session.set("githubLinksCount",urlList.length);
        }else if(typ=="trello"){
          Session.set("trelloLinksCount",urlList.length);
        }
        return !_.isEmpty(urlList);
    },
    getGithubRepos: function(list) {
        var lis = _.where(list, {
            type: 'github'
        });
        return lis;
    },
    getTrelloBoards: function(list) {
        var lis = _.where(list, {
            type: 'trello'
        });
        return lis;
    },
    getIssuesCount: function(list){
      var url = githubIssuesUrlParser(list.url);
      Meteor.http.call("GET", url, function(error, result) {
          if (error) {
              console.error("ProjectOpenTasks.js >getIssuesCount >Error:" + error);
          }
          if (result) {
              Session.set("issuesListCount"+url,result.data.length);
          }
      });
      return Session.get("issuesListCount"+url);
    },
    getCardsCount: function(list){
      url = trelloCardsCountUrlParser(list.url);
      Meteor.http.call("GET", url, function(error, result) {
          if (error) {
              console.error("ProjectOpenTasks.js >getCardsCount >Error:" + error);
          }
          if (result) {
              Session.set("cardsCount"+url,result.data.length);
          }
      });
      return Session.get("cardsCount"+url);
    },
    showRepo: function(issuesCount){
      if(issuesCount==0 && Session.get("githubLinksCount")!=1){
        return false;
      }else{
        return true;
      }
    },
    showBoard: function(cardsCount){
      if(cardsCount==0 && Session.get("trelloLinksCount")!=1){
        return false;
      }else{
        return true;
      }
    }
});

Template.trelloBoard.helpers({
    getCards: function(url) {
        //url = "https://api.trello.com/1/boards/rbpEfMld";
        url = trelloUrlParser(url);
        Meteor.http.call("GET", url, function(error, result) {
            if (error) {
                console.error("ProjectOpenTasks.js >getCards >Error:" + error);
            }
            if (result) {
                //limit result to the first 5 issues.
                //because we can only get the result in callback we can't
                //directly return it, so we're storing it in the Session...
                Session.set("trelloLists"+url, result.data);
            }
        });
        return Session.get("trelloLists"+url);
    },
    getBoardName: function(url){
      url = trelloBoardNameUrlParser(url);
      Meteor.http.call("GET", url, function(error, result) {
          if (error) {
              console.error("ProjectOpenTasks.js >getBoardName >Error:" + error);
          }
          if (result) {
              //limit result to the first 5 issues.
              //because we can only get the result in callback we can't
              //directly return it, so we're storing it in the Session...
              // Session.set("repoName"+url, result.data.name);
              Session.set("boardName"+url, result.data.name);
          }
      });
      return Session.get("boardName"+url);
    },
    showBoardName: function(){
      if(Session.get("trelloLinksCount")>1){
        return true
      }else{
        return false;
      }
    }
});

Template.trelloTasksTableRow.helpers({
    getLabels: function(lab) {
        var labels = "";
        for (var i = 0; i < lab.length; i++) {
            labels = labels + lab[i].name + ", ";
        }
        //delete the last ', '
        labels = labels.substring(0, labels.length - 2);
        return labels;
    },
    countCheckItems: function(checklistsIds){
      if(_.isEmpty(checklistsIds)){
        return 0;
      }else{
        checklistsIds.forEach(function(entry){
          var url = trelloCheckItemsCountUrlParser("https://api.trello.com/1/checklists/"+entry);
          Meteor.http.call("GET", url, function(error, result) {
              if (error) {
                  console.error("ProjectOpenTasks.js >countCheckItems >Error:" + error);
              }
              if (result) {
                console.log("count:",result.data.length);
                  Session.set("checkItemsCount"+url,result.data.checkItems.length);
              }
          });
          return Session.get("checkItemsCount"+url);
        });
      }
    }
});

Template.trelloTasksTableRow.events({
    "click .trelloTaskRow": function(event, template) {
        //open issue link
        window.open(this.shortUrl, "_blank");
    }
});

Template.githubRepo.helpers({
    getIssues: function(url) {
        //url = "https://api.github.com/repos/frabcus/house/issues?status=opened";
        url = githubIssuesUrlParser(url);
        Meteor.http.call("GET", url, function(error, result) {
            if (error) {
                console.error("ProjectOpenTasks.js >getDataGitub >Error:" + error);
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
              console.error("ProjectOpenTasks.js >getDataGitub >Error:" + error);
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
        url = url + "/cards?closed=false&fields=id,name,shortUrl,labels,desc,idChecklists&limit=5";
        return url;
    }
}

function trelloCardsCountUrlParser(url) {
    //https://trello.com/b/rbpEfMld/data-science
    if (url.includes("trello.com")) {
        if (!url.includes("http"))
            url = "https://" + url;
        url = url.replace("http://", "https://");
        url = url.replace("https://www", "https://");
        url = url.replace("https://trello.com/b", "https://api.trello.com/1/boards");
        //delete the humain readable name (data-science)
        url = url.substr(0, url.lastIndexOf("/"));
        url = url + "/cards?closed=false&fields=id";
        return url;
    }
}

function trelloBoardNameUrlParser(url) {
    //https://trello.com/b/rbpEfMld/data-science
    if (url.includes("trello.com")) {
        if (!url.includes("http"))
            url = "https://" + url;
        url = url.replace("http://", "https://");
        url = url.replace("https://www", "https://");
        url = url.replace("https://trello.com/b", "https://api.trello.com/1/boards");
        //delete the humain readable name (data-science)
        url = url.substr(0, url.lastIndexOf("/"));
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
