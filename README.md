# SH:24 Full Stack Engineer Tech Test

This is an implementation of the SH:24 Tech Test written in TypeScript and using React for rendering and flow.
It was developed using Node installed locally, but has a Docker implementation that does not rely on having Node installed for convenience.

## Node environment

With Node 16 installed you should be able to compile, run the tests, and start the server without installing anything extra.\
Run `npm install` before anything else to set up the necessary modules.

### Running tests

Use `npm test` to launch the test runner in the interactive watch mode.\
See the create-react-app documentation about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Running the app

To start the app in development mode use `npm start`.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Alternative Docker environment

If you have Docker and Docker Compose installed you can run the tests and server in a Docker container instead.

### Rebuilding the image

If changes have been made to the code, the underlying image will need to be rebuilt.
You can do this with `docker compose build`.

### Running tests

You can run the tests using `docker compose run web npm test`.

### Running the app

To start the app use `docker compose up`.
This will start the container running in a window; to stop it press ctrl-C.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
