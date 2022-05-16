import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const app = express();
const port = process.env.PORT || 8000;

// database connection using mongoose
const URI = 'mongodb+srv://pucheRR:BaSP2022@cluster0.3uv6a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI)
  // eslint-disable-next-line no-console
  .then(() => console.log('Database connected'))
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES from src/routes
app.use(router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

export default mongoose;
