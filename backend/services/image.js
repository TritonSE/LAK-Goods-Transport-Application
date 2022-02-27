import ImageModel from '../models/image';
import { InternalError, ServiceError } from '../errors';

export async function saveImage(rawImage) {
    console.debug('saveImage service running ', rawImage.originalname);
    let image = ImageModel({
        buffer: rawImage.buffer,
        originalname: rawImage.originalname,
        mimetype: rawImage.mimetype,
        encoding: rawImage.encoding,
        size: rawImage.size,
    });

    try {
        const newImage = await image.save();
        return newImage._id;
    } catch (e) {
        throw InternalError.IMAGE_UPLOAD_ERROR.addContext(e.stack);
    }
}

export async function getImage(imageId) {
    console.debug('getImage service running ', imageId);
    let image = await ImageModel.findById(imageId);
    if (!image) {
        throw ServiceError.IMAGE_NOT_FOUND;
    }
    return image;
}

export async function deleteImage(imageId) {
    console.debug('deleteImage service running', imageId);
    // TODO To be tested

    try {
        let res = await ImageModel.findByIdAndDelete(imageId);
    } catch (e) {
        throw InternalError.IMAGE_DELETE_ERROR;
    }
}