require('express-async-errors');

const AppError = require('./utils/AppError')
const express = require('express');
const database = require('./database/sqlite');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(routes);

database();

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
