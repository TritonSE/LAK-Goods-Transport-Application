import ImageModel from '../models/image';
import { InternalError } from '../errors';

export async function saveImage(rawImage) {
    console.debug('saveImage service running ', rawImage.originalname);
    let image = ImageModel({
        buffer: rawImage.buffer,
        originalname: rawImage.originalname,
        mimetype: rawImage.mimetype,
        encoding: rawImage.encoding,
        size: rawImage.size,
    });

    image.save((err) => {
        if (err != null) {
            throw InternalError.IMAGE_UPLOAD_ERROR.addContext(err.stack);
        }
    });
    return image._id;
}

export async function getImage(imageId) {
    console.debug('getImage service running ', imageId);
    let image = ImageModel.findById(imageId);
    return image;
}

export async function deleteImage(imageId) {
    console.debug('deleteImage service running', imageId);
    // TODO To be tested
    ImageModel.findByIdAndDelete(imageId, (err) => {
        if (err != null) {
            throw InternalError.IMAGE_DELETE_ERROR.addContext(err.stack);
        }
    })
}