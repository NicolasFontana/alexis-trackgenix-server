// use "import" to import libraries
import express from 'express';

// routes
import superAdmins from './resources/super-admins';

// use "require" to import JSON files

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/super-admins', superAdmins);
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
