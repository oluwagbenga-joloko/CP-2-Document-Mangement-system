Document management system
[![Coverage Status](https://coveralls.io/repos/github/andela-ojoloko/CP-2-Document-Mangement-system/badge.svg?branch=develop)](https://coveralls.io/github/andela-ojoloko/CP-2-Document-Mangement-system?branch=develop)
[![Build Status](https://travis-ci.org/andela-ojoloko/CP-2-Document-Mangement-system.svg?branch=develop)](https://travis-ci.org/andela-ojoloko/CP-2-Document-Mangement-system)
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
-   set you NODE_ENV to `test`
-   Run DB migrate command with `npm run migrate`.
-   Run Test `npm test` to run client and server side tests.
-   Run e2e test with `npm test e2e` (ensure application is running)
-   You can undo the migrations by running this command `npm run db:migrate:undo`.



## API Summary
View full API documentation [here](https://document-it.herokuapp.com/api-docs/)

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
