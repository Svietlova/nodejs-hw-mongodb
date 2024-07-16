import mongoose from 'mongoose';
import env from '../utils/env.js';

export default async function initMongoConnection() {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
      // mongodb+srv://irasvet1997:9m274GgFTG2Vf0BT@cluster0.cttdygj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error connecting to MongoDB', e);
  }
}
