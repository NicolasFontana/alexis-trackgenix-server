import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

const URI = 'mongodb+srv://pucheRR:BaSP2022@cluster0.3uv6a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI)
  // eslint-disable-next-line no-console
  .then(() => console.log('Database connected'))
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
// console.log(`Example app listening on port ${port}`);
});

export default mongoose;
