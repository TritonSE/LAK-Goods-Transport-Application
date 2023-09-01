export const PORT = process.env.PORT || 8080;
export const DATABASE = process.env.DATABASE || 'LAK-Testing';
export const MONGO_URI =
  process.env.MONGO_URI ||
  `mongodb+srv://admin:admin@lak.yacf5.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
export const GRID_FS_IMG_BUCKET = process.env.GRID_FS_IMG_BUCKET || 'images';
