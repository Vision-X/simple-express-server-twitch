//basic requirements for a express server
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// need to make an app variable to use
const app = express();

// tell our app what to use

app.use(morgan('dev'));

app.use(cors());

app.get('/', (request, response) => {
  response.json({
    message: ':unicorn: :rainbow: Hello World :rainbow: :unicorn:'
  });
})

app.get('/poop', (request, response) => {
  response.json({
    message: 'Youve made it to the hidden endpoint!'
  })
})

function notFound(request, response, next) {
  response.status(404);
  const error = new Error('Not Found - ' + request.originalUrl);
  next(error);
}

function errorHandler(error, request, response, next) {
  response.status(response.statusCode || 500);
  response.json({
    message: error.message,
    stack: error.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log('Listening on port ', port);
});
