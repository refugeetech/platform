# About

- This is a development plan for the backend of the mighub project
- The backend is implemented in the meteor framework
- This is in fact the backend for the RefugeeTech Platform

# Development Plan

## Task BreakDown

### Pictures and Logos
------
#### Step 0
------
- GET project logo URL using project.links where type == logo
- GET project mainPic URL using projects.links where type = mainPic
- GET project gallery pic URLs usign project.links where type = pic

NOTE:
Step0 has been implemented in the ProjectsSchema.links.type schema definition
```javascript
{label:"Project Pic", value:"mainPic"},
{label:"Project Logo", value:"logo"},
{label:"Picture", value:"pic"}
```

----
#### Step 1
----
- Create a new Schema/Collection for Picture Links
  - Be able to easily fetch pictures/logos of needed size
  - Be able to easily save pictures/logos of needed size with a structured name schema
 

----
#### Step 2
----
- Implement the file storage capability using the following packages already installed: 


[tomi:upload-server](https://github.com/tomitrescak/meteor-uploads)

[tomi:upload-jquery](https://github.com/tomitrescak/meteor-tomi-upload-jquery)


### Links
-----
#### Step 0
-----
- Get project Home Page URL using project.links where type == home
- Get project Web App URL using project.links where type == webApp

Step0 has been implemented in the ProjectsSchema.links.type schema definition
```javascript
{label: "Home Page", value:"home"},
{label: "Web App", value:"webApp"}
```

Previous link type definitions:
```javascript
//generic link types
{label: "Web", value: "web"},
{label: "Article", value: "article"},
{label: 'Blog', value:"blog"},
{label: "Other", value:"other"},
//appstores
{label: 'App Store', value:"appStore"},
{label: 'Google Play', value:"googlePlay"},
{label: 'Windows Store', value:"windowsStore"},
//social media types
{label: "Blogger", value: "blogger"},
{label: "Facebook", value: "facebook"},
{label: "Twitter", value: "twitter"},
{label: "Instagram", value: "instagram"},
{label: "Linkedin", value: "linkedin"}
```


## API for the ProjectHub
### GET API
----
#### Step 0
----

- Define endpoints for Tags collection

- Define endpoints Categories definitions

- Define endpoints to get projects by categories
  - Define endpoints to get projects by having all specified categories
  - Define endpoints to get projects by having only specified categories
  - Define endpoints to get projects by having any specified categories
- Define endpoints to get projects by tags
  - Define endpoints to get projects by having all specified tags
  - Define endpoints to get projects by having only specified tags
  - Define endpoints to get projects by having any specified tags
- Define endpoint to get all projects sorted under all categories
- Define endpoint to get all projects sorted under all tags


```Step0 has been implemented and has been described in the file API00.md```

```javascript
{label: "Home Page", value:"home"},
{label: "Web App", value:"webApp"}
```
----
#### Step 1
----

___Step1.0___
- Install users package (to handle api users)
- Install roles package 
- Install the restivus api package
- Configure the package
- Test the installation

___Step1.1___
- Define endpoints to update project
  - Add security to API
    - Add API Keys capability to API
- Define endpoints to add comments to project 
  - Decide if comments should be in a separate collection or within the project //SEPARATE COLLECTION CHOSEN
  - If separate collection
    - Decide if comments should be embedded with an id in a comments array in project //NOT EMBEDDED CHOSEN
      - IF embedded
        - Find out how to update the project when a new comment has been created in the comments collection referencing said projects id
    - add 'comments' top folder //COMPLETED
    - add comments/collection folder //COMPLETED
    - add collection.js file //COMPLETED
    - add new mongo collection //COMPLETED
      - check out projects/collections/collection.js for reference
    - add new schema definition in a new file comments/collections/schema.js //COMPLETED
      - field 1: projectId , type = string, optional = false => id of the project the comment is made for //COMPLETED
      - field 2: value/text, type = string, min = (an integer for the minimum amount of characters for the comment), max = (ditto max characters for the comment)  //COMPLETED
- Define endpoints to add reviews to project 
  - Analogous to breakdown of comments above
- Define endpoints to add ratings to project 
  - Analogous to breakdown of comments above

___Step1.2___
- Define endpoints to fetch all comments
  - Ditto Reviews, Ratings
- Defined endpoints to fetch all comments/ratings/reviews on specific project 
  - Ditto Reviews, Ratings 


----
#### Step 2
----
- Prepare the API for an MVP release
  - Upvote projects 
  - Fetch Projects 
   - embedd the count of upvotes 
  - Use versioning for the api endpoints
    - /api/0/
  - Handle errors and unwanted requests 
  - Comment out evrything not used for the mvp 

----
#### Step 3
----

- [Make the API RESTful](https://themeteorchef.com/recipes/writing-an-api/)
- Structure the API for reusability

  
 