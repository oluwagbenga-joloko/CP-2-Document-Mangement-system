Document management system
[![Coverage Status](https://coveralls.io/repos/github/andela-ojoloko/CP-2-Document-Mangement-system/badge.svg?branch=ft-client-environment-setup-146442779)](https://coveralls.io/github/andela-ojoloko/CP-2-Document-Mangement-system?branch=ft-client-environment-setup-146442779)
[![Build Status](https://travis-ci.org/andela-ojoloko/CP-2-Document-Mangement-system.svg?branch=develop)](https://travis-ci.org/andela-ojoloko/CP-2-Document-Mangement-system)
[![Code Climate](https://codeclimate.com/github/andela-ojoloko/CP-2-Document-Mangement-system//badges/gpa.svg)](https://codeclimate.com/github/andela-ojoloko/CP-2-Document-Mangement-system/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

# DOCUMENTIT

DOCUMENTIT is a full-stack application that helps users manage their documents. Users can define access rights to their documents.
The application utilizes RESTFUL API architecture for managing documents and users.

## Features

The app has two levels of authorization;
- Regular User can:
    - create an account
    - login/logout.
    - create documents
    - edit and Delete his/her document
    - edit and Delete his/her profile
    - limit access to a document by specifying an access level to public or private.
    - view public access  documents created by other users.
    - view role access documents created users with the same role level.

- An admin user has all the previlages of a regular user and can do the following too:
    - Delete Users
    - view all documents ( Private, public and role Access)
    - view all users.

## Technologies
The application was developed with [NodeJs](http://nodejs.org/), [Express](http://expressjs.com/) was used for routing and [Postgres](http://postgresql.com/) with sequelize was used for database management.
 [ReactJS](https://facebook.github.io/react/) with the [Redux](http://redux.js.org/) architecture was used to build the client side of the application.

## Installation
Follow the steps below to setup a local development environment. First ensure you have [Postgresql](https://www.postgresql.org/) installed, and a version of [Node.js](http://nodejs.org/) equal or greater than v6.10.0.

1. Clone the repository from a terminal   ` git clone https://github.com/andela-ojoloko/CP-2-Document-Mangement-system.git`.
2. Navigate to the project directory ``
3. Create a `.env` file in your root directory as described in `.env.sample` file
4. Install project dependencies `npm install`

## Usage
-   Run DB Migrate command with  `npm run migrate`
-   Seed you DB by running this command `npm run seed`, this seeds Roles(Regular and and admin roles) and some Users and some documents.
-   Run `npm run build` to build the dist folder and run the application.

## Testing
-   Run DB migrate command with `npm run migrate`.
-   Run Test `npm test:server` to run client side tests.
-   You can undo the migrations by running this command `npm run db:migrate:undo`.



## API Summary
View full API documentation [here](http://document-it.herokuapp.com/swagger.json)

### Users
EndPoint                      |   Functionality
------------------------------|------------------------
POST /api/users/login         |   Logs in a user.
POST /api/users/logout        |   Logs out a user.
POST /api/users/              |   Creates a new user.
GET /api/users/               |   Gets all users (available only to the Admin).
GET /api/users/:id           |   Find a user by id.
PUT /api/users/:id           |   Updates a user's profile based on the id specified (available to the profile owner or admin)
DELETE /api/users/:id        |   Delete a user's profile (available only to the admin)
GET /api/users/:id/documents   | Gets all documents for a particular user
GET /api/search/users/?q=${query} | Get all users with username containing the search query
GET /api/search/userdocuments/?q=${query} | Get all documents created by user whose title or content matching the search query.
### Documents
EndPoint                      |   Functionality
------------------------------|------------------------
POST /api/documents/          |   Creates a new document instance.
GET /api/documents/           |   Gets all documents.
GET /api/documents/:id       |   Find document by id.
PUT /api/documents/:id       |   Updates a document's attributes. (available only to the author)
DELETE /api/documents/:id    |   Delete a document. (available only to the author)
GET /api/search/documents/?q=${query} | Get all documents with title containing the search query

### Roles (can only be tested using postman)
EndPoint                      |   Functionality
------------------------------|------------------------
GET /roles/               |   Get all Roles.
POST /roles/               |   Create a Role.
PUT /roles/:id               |   Edit a Role.
DELETE /roles/:id               |   Delete a Role.


### Contributing

If you are interested in contributing to development of DocuemntIt, that's really great!

Follow the instructions below to contribute.

- Fork the repository

- Make your change

- Commit your change to your forked repository 

- Provide a detailed commit description 

- Create a pull request


### Licence
MIT