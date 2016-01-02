# Contributing
Use the following guidelines when contributing to this project.

# Workflow
Please follow the [Gitflow guidelines](http://danielkummer.github.io/git-flow-cheatsheet/). Specifically:
* Create a new feature branch from the `develop` branch
* Prefix your feature branch name with `/feature`
* When ready for review, create a pull request against the `develop` branch

# Code standard
## JavaScript semi-standard
Please follow the [JavaScript semi-standard coding style](https://github.com/Flet/semistandard).

## Comments
*Every* significant line of code should have an accompanying human language (English) comment. This is for several reasons:

* Comments act like a pair-programmer, explaining the code to other developers or your future self
* Comments may illuminate logical errors in the code they accompany
  * logical errors where code is not doing what is expected
  * semantic errors where the code is not [literate](https://en.wikipedia.org/wiki/Literate_programming)

## Variables
Use semantic variable names. Semantic variable names have the following traits:

* They succinctly describe what they represent
* Words are fully spelled out
* Variables with multiple words use camel case notation
* When used in subsequent lines of code, the variable name reads as close to a plain language sentence as possible
 
## Reference
For further reference, please [read Human JavaScript][http://read.humanjavascript.com/) by Henrik Joreteg.

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
Mockup data stuff
Schema stuff
Routing stuff

