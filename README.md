# Pollster

This is a simple polling web application that helps people to create polls and take surveys, vote for polls and view statistics. This project is created by 2 CSE'23 undergraduates of [VNIT](https://vnit.ac.in/), [Prabhav](https://github.com/prabhav951) and [Gowtham](https://github.com/GowthamG30).

## Prerequisites

NodeJS with version atleast v14.17.0 is required. Refer [this](https://nodejs.org/en/) for installation.

## Cloning and installing dependencies

Clone the project into local
```console
git clone https://github.com/GowthamG30/pollster.git
```

<!-- In the project directory `pollster/`, run this command in the terminal to install all npm packages for backend. -->
Run the following command in the terminal in both `pollster/` and `pollster/frontend/` directories in order to install all npm packages for backend and frontend respectively.

```console
npm install
```

## Running the Application in local system

Make sure the ports 3000 and 5000 are not occupied in localhost.

To start the backend, run the following command in `pollster/` directory

```console
node server.js
```

To start the frontend, run the following command in another terminal, in `pollster/frontend` directory

```console
npm start
```

The project will automatically open in [http://localhost:3000](http://localhost:3000) in your default browser

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Note

You must make an `.env` file and place it in `pollster/` directory.  Note that this information is sensitive and important. It consists of:

> JWT_SECRET_KEY - A random string used to encode the payload into JWT. Ex: `abcdebfdbabdeb24592ebfa`\
> MONGO_URI - URI of the cluster, present in MongoDB Atlas. Ex: `mongodb://mongodb0.example.com:27017`\
> SALT_ROUNDS - Number of salt rounds required to hash password using “bcrypt.js”. Ex: `10`\
> TOKEN_LIFE - Lifetime of a JSON Web Token. Ex: `60s`, or `10h` or `7d`