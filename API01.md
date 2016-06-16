# base endpoint
/api/v01

HEADERS:
```
Content-Type:application/json
```

# get all projects
/projects

# get single project
/projects/:id

# get all projects with ratings embedded
/projects/ratings

# get single project with ratings embedded
/projects/:id/ratings

# get all ratings
/ratings

# POST new rating

ROUTE: /ratings

BODY EXAMPLE: (required: {rater, weakId, rated, collection, id})
```
{
    "rater": {
        "weakId":"api-test",
        "id":""
    },
    "rated": {
        "collection":"projects",
        "id": "koAeSLKJb9AjWALaq"
    },
    "rating": "UP"
}
```
# POST new project

ROUTE: /projects

BODY EXAMPLE: (required: {name, description, challengeCategories}, , optional: _id)
```
{
  "name": "Lorem Ipsum",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "tags": [
    "lorem",
    "ipsum"
  ],
  "challengeCategories": [
    "social",
    "bureaucracy",
    "housing",
    "education",
    "language",
    "employment",
    "coordination",
    "information"
  ],
  "targetPlatforms": [
    "web",
    "ios",
    "android",
    "windows-phone",
    "other"
  ],
  "links": [
    {
      "type": "home",
      "name": "Home Page",
      "url": "http://www.lipsum.com/"
    },
    {
      "type": "googlePlay",
      "name": "Android App",
      "url": "http://www.lipsum.com/"
    },
    {
      "type": "appStore",
      "name": "Iphone App",
      "url": "http://www.lipsum.com/"
    },
    {
      "type": "windowsStore",
      "name": "Windows Store",
      "url": "http://www.lipsum.com/"
    },
    {
      "type": "webApp",
      "name": "Windows Store",
      "url": "http://www.lipsum.com/"
    }
    
  ],
  "startupDate": "2016-06-16T00:00:00.000Z",
  "postalAddress": {
    "city": "Internet",
    "country": "Global"
  },
  "migHubComplete": false
}
```

# PUT project

ROUTE: /projects/:id

BODY EXAMPLE: (required: {name, description, challengeCategories})
```
{
    "name": "400contacts",
    "description": "400contacts is a mentoring program with one goal in mind. To help refugees with engineering background get their first skilled job in Sweden.",
    "links": [
      {
        "type": "home",
        "name": "Home Page",
        "url": "http://www.400contacts.com"
      },
      {
        "type": "logo",
        "name": "Logo",
        "url": "https://pbs.twimg.com/profile_images/658954410320613376/lfmxz3ck_400x400.png"
      }
    ],
    "challengeCategories": [
      "employment"
    ],
    "tags": [
      "employment"
    ],
    "startupDate": "2016-05-04T00:00:00.000Z",
    "targetPlatforms": [
      "web"
    ],
    "postalAddress": {
      "city": "Stockholm",
      "country": "Sweden"
    },
    "dateListed": "2016-05-29T11:48:16.397Z",
    "upvotes": 6
}
```

# POST many projects (create)

ROUTE: /projects/import

BODY EXAMPLE: (required: {name, description, challengeCategories} , optional: _id)
```
[
  { 
    /* Project 1 */
  },
  {
   / ... Project N */
  }
]
```

RESPONSE: Array with response body for each project

# PUT many projects (update)

ROUTE: /projects/import

BODY EXAMPLE: (required: {_id, name, description, challengeCategories})
```
[
  { 
    /* Project 1 */
  },
  {
   / ... Project N */
  }
]
```

RESPONSE: Array with response body for each project