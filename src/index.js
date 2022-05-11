// use "import" to import libraries
// import express from 'express';

const express = import('express');

// use "import" to import JSON files
const admins = import('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/projects', import('./resources/projects'));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
