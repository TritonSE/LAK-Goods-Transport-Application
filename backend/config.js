const PORT = 3000;
const DATABASE = "LAK";
const MONGO_URI = `mongodb+srv://admin:admin@lak.yacf5.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
const GRID_FS_IMG_BUCKET = 'images';

module.exports = {
    MONGO_URI,
    PORT, 
    GRID_FS_IMG_BUCKET
}