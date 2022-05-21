import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();
const port = process.env.PORT || 3000;

mongoose.connect(
  'mongodb+srv://pucheRR:BaSP2022@cluster0.3uv6a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('🔴 Database error: ', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('✅ Database connected');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
