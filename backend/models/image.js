import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ImageSchema = Schema({
  buffer: Buffer,
  originalname: String,
  mimetype: String,
  encoding: String,
  size: Number,
});

const ImageModel = model('Image', ImageSchema);
export default ImageModel;
