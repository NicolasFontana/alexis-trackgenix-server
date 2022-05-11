import express from 'express';
import taskRouter from './resources/tasks';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/tasks', taskRouter);

app.get('/', async (req, res) => {
  res.send('Trackgenix SA');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
