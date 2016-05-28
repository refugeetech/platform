# Readme
- This readme is basically a todo for the files under projectProfileTemplate folder
- The template shows a projects profile on the route /projects/#projectId

## What
- Use the meteor framework as the preferred choice of hacking the projecthub
- Populate the template files with project data.
    - Check out the template singleProjectBox.html/js for reference on how its done
- The html static files are found in top folder HTMLTemplates/projectProfileHTMLTemplateRefactored
    - The route to the static projectProfile is /project-profile-html-template
- Use the route /projects to check out projects in the database
    - clicking a project routes to projects/#projectId
        - you are now seeing the template projectProfile in the html file with the same name
            - The first sub template is singleProjectBox which is already populated with project data

## Alternate way of hacking the projecthub (not programming in meteor)
- Use the meteor server as a cms 
- Add to the schema file if necessary
    - update the 'add' template and the 'update' template so you are able to use the new schema definitions when adding/editing new projects
- Read all projects using the JSON api with the route /projects/json
- Read a single project using the JSON api with the route /projects/#projectId/json
- Add projects to the database using the route /projects/add
- Update a project using the route /projects/#projectId/update

## Info
- Add mock projects by typing "Factory.create('project')" in the browser console
- check out the repository github.com/refugeetech/platform
    - Check out issues for possible leads on bugs 

## Schema
- the schema file is in the folder projects/collections/schema.js
    - You can, (and probably should), add to the schema but you should probably not change any existing definitions to not break anything
        - the exception to that is if something is horribly badly designed and you need to change it to make it onsistent with what you are hacking

## Questions
- Send me an email or ping me on slack if you are having any TECH related questions and ill get back as soon as possible
- See you later on SUP / Leo