// use "import" to import libraries
import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(router);

export default app;
