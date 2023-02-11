/**
 * UserService that manages the User documents in the DB
 */
import UserModel, { OWNER_LIMITED_FIELDS } from "../models/user";
import { ServiceError } from "../errors";
import { saveImage } from './image';

export async function getUser(requestedUserId, requestingUserId) {
    console.debug(`SERVICE: getUser service running: requestedUserId - ${requestedUserId}`);
    let user = await UserModel.findById(requestedUserId);
    if (!user) throw ServiceError.USER_NOT_FOUND.addContext('requestedUserId - ', requestedUserId);
    
    user = user.toObject();
    if (!requestedUserId.equals(requestingUserId)) {
        OWNER_LIMITED_FIELDS.forEach(field => delete user[field]);
    }

    return user;    
}

export async function getUsers(userIds, requestingUserId) {
    console.debug(`SERVICE: getUsers service running: userIds - ${userIds}`);

    const users = [];
    for (let userId of userIds) {
        users.push(await getUser(userId, requestingUserId));
    }

    return users;
}

export async function registerUser(userData, imageFiles) {
    console.debug(`SERVICE - registerUser service running: userData - ${JSON.stringify(userData)}`);
    const { firstName, lastName, phone, location, driverLicenseId, ...vehicleData } = userData;

    // Store images
    const imageIds = [];
    for (let image of imageFiles) {
        let imageId = await saveImage(image);
        imageIds.push(imageId);
    }
    if (imageIds.length > 0) 
        vehicleData['imageIds'] = imageIds;

    // Create User
    let user = null;
    try {
        user = await UserModel({
            firstName, 
            lastName, 
            phone,
            location,
            driverLicenseId,
            ...(driverLicenseId == undefined ? {} : {vehicleData: vehicleData})
        });
    } catch (e) {
        throw ServiceError.INVALID_USER_RECEIVED.addContext(e.stack);
    }

    try {
        return await user.save();
    } catch (e) {
        throw ServiceError.INVALID_USER_RECEIVED.addContext(e.stack);
    }
}

export async function updateUser(userId, userData, userImages) {
    console.debug(`SERVICE: updateUser service runnning: userId - ${userId}`);
    // Retrieve original user
    let originalUser = await UserModel.findById(userId);
    if (!originalUser) {
        throw ServiceError.USER_NOT_FOUND;
    }

    //TODO Find a better way of updating images

    // // Delete existing images
    // let existingImageIds = originalUser.imageIds;
    // for (let imageId of existingImageIds) {
    //     await deleteImage(imageId);
    // }

    // // Add new images
    // let newImageIds = [];
    // for (let image of userImages) {
    //     let imageId = await saveImage(image);
    //     newImageIds.push(imageId);
    // }
    
    // userData = {
    //     ...userData,
    //     imageIds: newImageIds,
    // }

    try {
        return await UserModel.findOneAndUpdate({'_id': userId}, userData)
    } catch (e) {
        throw ServiceError.INVALID_USER_RECEIVED.addContext(e.stack);
    }
}