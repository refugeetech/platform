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
BODY PARAMS:
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


