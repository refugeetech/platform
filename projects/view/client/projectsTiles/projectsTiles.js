// projectsTiles template
Template.projectsTiles.created = function() {
    // Get reference to template instance
    let instance = this;
    // Subscribe to all projects
    instance.subscribe("allProjects");
};

Template.projectsTiles.helpers({
    projects: function() {
        var challenge = Session.get("challenge");
        var country = Session.get("country");
        //TODO: possible enhacements here
        if (_.isEmpty(challenge) && !_.isEmpty(country)) {
            var list = Projects.find({
                "postalAddress.country": country
            }).fetch();
        }
        if (!_.isEmpty(challenge) && _.isEmpty(country)) {
            var list = Projects.find({
                "challengeCategories": challenge,
            }).fetch();
        }
        if (!_.isEmpty(challenge) && !_.isEmpty(country)) {
            var list = Projects.find({
                "challengeCategories": challenge,
                "postalAddress.country": country
            }).fetch();
        }
        if (_.isEmpty(challenge) && _.isEmpty(country)) {
            var list = Projects.find({}).fetch();
        }

        return list;
    },
    challenges: function() {
        var list = Projects.find().fetch();
        var justCategories = _.pluck(list, "challengeCategories");
        var flattendList = _.flatten(justCategories);
        var uniqueCategories = _.uniq(flattendList);
        return uniqueCategories;
    },
    countries: function() {
        var list = Projects.find().fetch();
        var justaddresses = _.pluck(list, "postalAddress");
        var justcountries = _.pluck(justaddresses, "country");
        var flattendList = _.flatten(justcountries);
        var uniqueCountries = _.uniq(flattendList);
        //REMOVE SWEDEN
        var filtered = _.filter(uniqueCountries,function(item) {
            return item !== "Sweden"
        });
        return filtered;
    },
});

var dropdownActive = false;
Template.projectsTiles.events({
    "click #projectsButton": function(event, template) {
        this.activePage = "projects";
        $('.slide').toggleClass('move');
        $('#volunteersButton').removeClass('link-active');
        $('#projectsButton').addClass('link-active');
    },
    "click #volunteersButton": function(event, template) {
        this.activePage = "volunteers";
        $('.slide').toggleClass('move');
        $('#projectsButton').removeClass('link-active');
        $('#volunteersButton').addClass('link-active');
    },
    "click #challenges-filter": function(event, template) {
        $('#challenges-dropdown').toggleClass('open');
        dropdownActive = !dropdownActive;
    },
    "click #country-filter": function(event, template) {
        $('#country-dropdown').toggleClass('open');
        dropdownActive = !dropdownActive;
    },
    "click .dropdown-menu .challenges": function(event, template) {
        $(this).toggleClass('active');

        var val = $(event.target).text().toLowerCase();
        if (val === "all challenges") {
            Session.set("challenge", "");
        } else {
            Session.set("challenge", val);
        }

        //reload packery
        var $grid = $('.grid').packery({
            itemSelector: '.grid-item',
            percentPosition: true
        });
        $grid.packery('destroy');
        // layout Packery after each image loads
        $grid.imagesLoaded().progress(function() {
            $grid.packery();
        });

    },
    "click .dropdown-menu .countries": function(event, template) {
        $(this).toggleClass('active');

        var val = $(event.target).text();
        if (val === "All countries") {
            Session.set("country", "");
        } else {
            Session.set("country", val);
        }

        //reload packery
        var $grid = $('.grid').packery({
            itemSelector: '.grid-item',
            percentPosition: true
        });
        $grid.packery('destroy');
        // layout Packery after each image loads
        $grid.imagesLoaded().progress(function() {
            $grid.packery();
        });

    },
});


// gritItem Template
Template.gridItem.helpers({
    getURLByType: function(list, type) {
        return _.findWhere(list, {
            type: type
        }).url;
    },
});

Template.gridItem.rendered = function() {
    var $grid = $('.grid').packery({
        itemSelector: '.grid-item',
        percentPosition: true
    });
    // layout Packery after each image loads
    $grid.imagesLoaded().progress(function() {
        $grid.packery();
    });

    //if the image is not loaded put a placeholder
    $("img").on('error', function() {
        console.log("error loading image");
        //TODO: to be changed
        $(this).attr("src", "images/4_open_source_networking_help.svg");
        $(this).css("width", "200px");
        $(this).css("height", "200px");
        $(this).prev().css("visibility", "visible");
    });

};
