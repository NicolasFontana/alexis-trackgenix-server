const express = import('express');
// use "import" to import JSON files
const projects = import('./data/projects.json');
const router = import('./resources/projects');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api/projects', router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});
app.get('/projects', (req, res) => {
  res.status(200).json({
    data: projects,
  });
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
