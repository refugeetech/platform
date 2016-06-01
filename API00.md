# About

API for the ProjectHub

---
# GET API
---

# GET Categories
  
## GET All category values (category.value) in ProjectsSchema

ENDPOINT: 

/categories/json

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:['category.value']
    },
    pseudoQuery:'return category.value from each challengeCategories.options in ProjectsSchema'
  },
  data:result
}
```
sourcefile: projects/server/jsonRoutes.js

## GET All category objects from database

ENDPOINT: 

/categories/o/json

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:['category']
    },
    pseudoQuery:'return challengeCategories.options in ProjectsSchema'
  },
  data:result
}
```
sourcefile: projects/server/jsonRoutes.js

# GET Tags

## GET All tags (tag names) in database

ENDPOINT: 

/tags/json

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:['tag.name']
    },
    pseudoQuery:'return tag.name for each tag in Tags'
  },
  data:result
}
```
sourcefile: tags/server/jsonRoutes.js

# GET Projects

## GET All

### GET All Projects 

ENDPOINT: 

/projects/json

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:['project']
    },
    pseudoQuery:'return all projects'
  },
  data:result
}
```
sourcefile: projects/server/jsonRoutes.js


### GET All challengeCategories with All Projects Under Each challengeCategories

ENDPOINT: 

/categories/projects/json 

Returns:
```javascript
{
  meta: {
    schemaDescription:
    {
      fieldDescription:
      {
        name:'the name of the tag',
        projects: 'list of projects'
        
      },
      dataStructure:
      [
        {
          name:'tag.name',
          projects:['project']
        }
      ]
    },
    pseudoQuery:'return tag.name from each tag in Tags with return each project in database where tag.name in project.tags'
  },
  data:out
}
```
sourcefile: projects/server/jsonRoutes.js


### GET All Tags with All Projects Under Each Tag

ENDPOINT: 

/tags/projects/json

Returns:
```javascript
{
  meta: {
    schemaDescription:
    {
      fieldDescription:
      {
        name:'the name of the tag',
        projects: 'list of projects'
        
      },
      dataStructure:
      [
        {
          name:'tag.name',
          projects:['project']
        }
      ]
    },
    pseudoQuery:'return tag.name from each tag in Tags with return each project in database where tag.name in project.tags'
  },
  data:out
}
```
sourcefile: tags/server/jsonRoutes.js


## GET by ID

### GET Single Project by id

ENDPOINT:

 /projects/___:projectId___/json

Parameter Syntax: projectId

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:'project'
    },
    pseudoQuery:'return project in Projects where ['+req.params.projectId+'] equals project._id'
  },
  data:result
}
```
sourcefile: projects/server/jsonRoutes.js

## GET by challengeCategories

### GET all projects having all specified Categories


ENDPOINT: 

/categories/___:categories___/json

Parameter Syntax: category1,category2,...

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:['project']
    },
    pseudoQuery:'return project in database where all of ['+req.params.categories+'] in project.challengeCategories'
  },
  data:result
}
```
sourcefile: projects/server/jsonRoutes.js

### GET all projects having any of specified Categories


ENDPOINT: 

/categories/in/___:categories___/json

Parameter Syntax: category1,category2,...

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:['project']
    },
    pseudoQuery:'return Project in Projects where all of ['+req.params.categories+'] in project.challengeCategories'
  },
  data:result
}
```
sourcefile: projects/server/jsonRoutes.js


### GET all projects having only specified Categories


ENDPOINT: 

/categories/eq/___:categories___/json

Parameter Syntax: category1,category2,...

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:'project'
    },
    pseudoQuery:'return project in Projects where ['+req.params.categories+'] equals project.challengeCategories'
  },
  data:result
}
```
sourcefile: projects/server/jsonRoutes.js

## GET Projects by Tags

### GET all projects having all specified Tags


ENDPOINT: 

/tags/___:tags___/json

Parameter Syntax: tag1,tag2,...

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:['project']
    },
    pseudoQuery:'return project in Projects where all of ['+req.params.tag+'] in project.tags'
  },
  data:result
}
```
sourcefile: tags/server/jsonRoutes.js

### GET all projects having only specified tags


ENDPOINT: 

/tags/only/___:tags___/json

Parameter Syntax: tag1,tag2,...

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:['project']
    },
    pseudoQuery:'return project in Projects where only ['+req.params.tags+'] in project.tags'
  },
  data:result
}
```
sourcefile: tags/server/jsonRoutes.js


### GET all projects having any of specified tags


ENDPOINT: 

/tags/any/___:tag___/json

Parameter Syntax: tag1,tag2,...

Returns:
```javascript
{
  meta:
  {
    schemaDescription:
    {
      fieldDescription:'',
      dataStructure:['project']
    },
    pseudoQuery:'return project in Projects where any of ['+req.params.tag+'] in project.tags'
  },
  data:result
}
```
sourcefile: tags/server/jsonRoutes.js


  
