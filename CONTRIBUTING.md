# How to contribute

# Workflow
When contributing to the project, please follow the Gitflow guidelines. Specifically:
* Create a new feature branch from the `develop` branch
* Prefix your feature branch name with `/feature`
* When ready for review, create a pull request against the `develop` branch


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

