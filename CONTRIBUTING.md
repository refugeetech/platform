# Contributing
Use the following guidelines when contributing to this project.

# Submitting issues
There are a couple of common issue types in our tracker:
* Bug reports / support requests
* Features/enhancements
 
Please follow our issue guidelines, when submitting new issues.

## General details
Each issue should have the following details:
* brief, descriptive title
* short overview paragraph further describing the issue
 
## Feature/enhancement requests
Provide the following details for feature/enhancement requests:

* [user story](https://en.wikipedia.org/wiki/User_story) - short paragraph in the form of "As a [user role], I would like [feature/enhancement], so that [need fulfilled]"
* [wireframe](https://en.wikipedia.org/wiki/Website_wireframe) - simple, monochrome diagram depicting the desired user interface (in SVG or PNG format)
* acceptance criteria (simplified) - checklist of present tense statements describing how the feature behaves
 
### Feature/enhancement request example

> #### Add new widget to page
>
> The page does not have a widget. Add a widget to the page.
>
> #### User story
> ```
> As a registered user
> I need a widget on the page
> so that I have something to click
> ```
>
> #### Design
> [Monochrome diagram of the desired design, e.g. a wireframe.]
>
> #### Definition of Done
> The task is complete when the following criteria are satisfied:
> * [ ] Widget appears on page
> * [ ] User can click on widget
 
**Note:** Some of the above details will be added during the feature discovery and planning process.

## Bug reports / support requests
When submitting a bug report or support request, include the following details, if possible:

* steps to reproduce
* screenshot showing observed behavior
* description of observed behavior
* description of expected behavior
* relevant environment details (e.g. web browser, operating system, etc)
 
### Bug report/support request example

> #### Widget doesn't work when clicked
>
> On the page, the widget doesn't do anything when clicked.
>
> #### Steps to reproduce
> 1. View the page
> 1. Click the widget
>
> #### Observed behavior
> When clicking the widget, nothing happens.
>
> [Optionally include a screenshot, if it is relevant.]
>
> #### Expected behavior
> When clicking the widget, something should happen.
>
> #### Environment
> * Web browser
> * Operating system
 
**Note:** Some of the above details will be added during the discussion and testing process.

# Contributing code
When contributing code, please follow the [Gitflow guidelines](http://danielkummer.github.io/git-flow-cheatsheet/). Specifically:

1. Create a new feature branch from the `develop` branch
2. Prefix your feature branch name with `/feature`
 
Additionally, the following steps help our team stay coordinated:

1. Immediately open a pull request by comparing your branch against the `develop` branch
2. Label your pull request as `needs work`, so that other developers can see the work in progress
3. When ready for review, @ mention the development team, so that we know to review your code
 
**Important:** Getting developer feedback is part of our peer review process. It helps to highlight issues and improvements early in the process.
  
 ![git flow diagram with peer review step](https://openclipart.org/image/600px/svg_to_png/236560/Gitflow-featureBranch-peerReview.png)

## Code quality
In a nutshell, **write code for humans to read and understand**. Our code will be minified for machines during the build process. For further reference, please [read Human JavaScript](http://read.humanjavascript.com/) by Henrik Joreteg.

## Comments
*Every* significant line of code should have an accompanying human language (English) comment. This is for several reasons:

* Comments act like a pair-programmer, explaining the code to other developers or your future self
* Comments may illuminate errors
  * logical errors where code is not doing what is expected
  * semantic errors where the code is not [literate](https://en.wikipedia.org/wiki/Literate_programming)

## One task per line
Each line of code should perform only one action. When chaining is important, each chained aciton should be placed on a new line.

## JavaScript semi-standard
Please follow the [JavaScript semi-standard coding style](https://github.com/Flet/semistandard).

## Variables
Use semantic variable names. Semantic variable names have the following traits:

* They succinctly describe what they represent
* Words are fully spelled out
* Variables with multiple words use camel case notation
* When used in subsequent lines of code, the variable name reads as close to a plain language sentence as possible

# File structure
This project is using a feature module organization pattern. Please use the following, or similar, file structture:

  * / (project root)
    * featureName/
      * collections/
        * collection.js
        * schema.js
        * permissions.js
      * client/
        * templateName/
          * templateName.html
          * templateName.js
         * routes/
          * routes.js 
      * server/
        * methods.js
        * publications.js

## Packages
The RefugeeTech platform is built using the [Meteor.js framework](https://meteor.com). The following Meteor packages are important components of the RefugeeTech Platform.

### Forms
[AutoForm](https://github.com/aldeed/meteor-autoform) is used to provide easy input forms, based on schema definitions (see below).

### Mockup data
[Anti Fake](https://github.com/anticoders/meteor-fake/) is used to generate fake/example data.

### Routing
[Flow Router](https://github.com/kadirahq/flow-router) is used for project routing.

### Schema
[Simple Schema](https://github.com/aldeed/meteor-simple-schema) is used to create schemas for our database collections.

### Templating
[Blaze](https://meteor.github.io/blaze/) is the templating language used in our project packages.

### CSS
[Bootstrap](http://getbootstrap.com/) is the primary CSS framework for the RefugeeTech templates.
