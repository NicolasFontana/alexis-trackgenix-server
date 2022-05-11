// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
import tasksRouter from './resources/tasks';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
// console.log(`Example app listening on port ${port}`);
});
