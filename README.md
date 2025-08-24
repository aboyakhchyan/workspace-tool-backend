# Workspace Tool Backend

Backend application for managing workspaces. Built with NestJS, Prisma, and PostgreSQL.


## Tech Stack

- **Prisma** — ORM for database management
- **JWT & Passport** — authentication
- **Swagger** — API documentation
- **Argon2** — password hashing
- **Multer & Sharp** — file uploads and image processing
- **Joi** — input validation

## Project setup

```bash
$ yarn install
$ (db) psql -> CREATE DATABASE
$ yarn migrate
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
