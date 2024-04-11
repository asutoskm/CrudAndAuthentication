# Nest Test Assignment

This project is a starter repository for a [Nest](https://github.com/nestjs/nest) framework TypeScript application with CRUD operations and authentication features.

## Description

This repository is set up with NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Prerequisites

Before running the application, make sure you have [Node.js](https://nodejs.org/en/) installed on your machine.

## Installation

To install the dependencies, run the following command:
npm install


## Environment Configuration

Create a `.env` file in the root directory of the project and add the following environment variables for database connection and TypeORM configuration:

## PostgreSQL database connection settings
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=usename
POSTGRES_PASSWORD=post
POSTGRES_DB=testnest

### TypeORM configuration
TYPEORM_SYNC=true
TYPEORM_LOGGING=true

### Running the application
- For development:
$ npm run start

- In watch mode:
watch mode
$ npm run start:dev
- In production mode:
$ npm run start:prod

### Testing

- For unit tests:
$ npm run test

- For e2e tests:
$ npm run test:e2e

- For test coverage:
$ npm run test:cov
