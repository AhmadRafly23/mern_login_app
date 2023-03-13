import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connect from './database/connection.js';

const app = express();
const port = 8080;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Routes
app.get('/', (req, res) => {
  res.status(201).json('Hello World');
});

connect()
  .then(() => {
    try {
      // Starting the server
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    } catch (err) {
      console.log('Invalid port');
    }
  })
  .catch((err) => {
    console.log('Invalid database connection');
  });
