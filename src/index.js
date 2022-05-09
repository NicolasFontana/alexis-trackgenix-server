const express = require('express');
const taskRouter = require('./resources/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// Ruta de redireccion router
app.use('/api/task', taskRouter);

app.get('/', async (req, res) => {
  res.send('Trackgenix SA');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
