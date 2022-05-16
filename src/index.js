/* eslint-disable no-console */
//
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

const URI = 'mongodb+srv://pucheRR:BaSP2022@cluster0.3uv6a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error(error));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use(router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
// console.log(`Example app listening on port ${port}`);
});
