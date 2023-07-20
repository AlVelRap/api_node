# API Starter NodeJS-MySQL

This API can be use as base for a larger API that use NodeJS and MySQL.

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Inspiration](#inspiration)
- [Roadmap](#readmap)
- [Contact](#contact)

## Introduction

I just wanted to learn how to create APIs, so I created this REST API to practice and have a base to build on in the future. That is why the idea of this project is to learn and develop an API, which, although basic, has all the elements of an application, such as tests, deployment or security.

## Technologies

Built with:

- NodeJS
- ExpressJS
- MySQL
- JSON Web Token

## Getting Started

To run this porject you will need npm installed in your computer so, if you are using windows follow this [link](https://nodejs.org/en/download).

And if you are using linux you can use:

```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

### Installation

1. Clone or download this repository and install node modules:

```
git clone https://github.com/AlVelRap/api_node.git
cd api_node
npm install
```

2. Modify `.env` file with all the configuration you want to apply.

3. if you modify `DB_USER`, `DB_PASSWORD` or `DB_NAME` variables from `.env` file, remember to modify script `exampledb.sql` with the new values.

### Usage

If you want to start the API REST:

```
npm run start
```

or if you want you can run with development mode (with hotreload) running command:

```
npm run dev
```

## Inspiration

This API is based on this [bezkoder tutorial](https://www.bezkoder.com/node-js-rest-api-express-mysql/).

## Roadmap

- Create API REST with Node and Express (Done)
- Add security to routes with JSON Web Token (Done)
- Dockerize the API
- Add unit test
- Add e2e test
- Create a Pipeline for Github Actions
- Automatize deployment of master´s branch

<!-- ## Contact -->
