// import app from '../app';
import proyectModel from '../models/Projects';
import proyectSeed from '../seed/projects';

beforeAll(async () => {
  await proyectModel.collection.insertMany(proyectSeed);
});
