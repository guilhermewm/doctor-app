# Welcome to the api app documentation

## How to run?

In the project directory, you can run:

`npm install`

It will install all the dependencies

`npm start`

It will run the server, MongoDB will run into the Cloud

It will run the server in the port: 4000

`npm test`

To run all the tests

`npm run test-coverage`

To run all the tests and see the coverage

# API

## /user

### POST /user/register

```javascript
{ 
    "name": "a name",
    "email": "email@email.com",
    "password": "password"
}
```

### POST /user/login

```javascript
{ 
    "email": "email@email.com",
    "password": "password"
}
```

It will return an auth-token, you will use it in the header of the other services as:

```javascript
{ 
    "auth-user": "token"
}
```

## /cases

### GET /cases

It will return all cases, with some parameters:

`?number=$numberOfElements`

It will return one element

`?isReviewed=boolean`

It will return the cases that were reviewed or not

### GET /cases/:id

It will return the case using the specified id

### POST /cases

It will create a case

```javascript
{ 
    "description": "text"
}
```

### PATCH /cases/:id

It will update a case with the doctorsId, conditionId, and it will check as reviewed

caseId as parameter

body: 
```javascript
{ 
    "conditionId": "hash",
    "userId": "hash"
}
```

### DELETE /cases/:id

It will delete a case using the id

## /conditions

### GET /conditions

It will return all conditions:

### GET /conditions/:id

It will return a condition using the specified id

### POST /conditions

It will create a condition

body:
```javascript
{ 
    "code": "A2BC",
    "description": "text"
}
```

### DELETE /conditions/:id

It will delete a condition using the id
