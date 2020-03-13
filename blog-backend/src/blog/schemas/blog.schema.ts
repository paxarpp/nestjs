import * as mongoose from 'mongoose';

// определить типы данных, хранимые в базе данных
export const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  author: String,
  datePosted: String
});
