/**
 * UserService that manages the User documents in the DB
 */
import UserModel, {
  OWNER_LIMITED_FIELDS,
  FIELDS_USER_PERMITTED_TO_UPDATE,
  VERIFICATION_STATUS_NOT_APPLIED,
} from '../models/user';
import { ServiceError } from '../errors';
import { saveImage, deleteImage } from './image';
import { filterObject } from '../helpers';

export async function getUser(requestedUserId, requestingUserId) {
  console.debug(
    `SERVICE: getUser service running: requestedUserId - ${requestedUserId}`
  );

  let user = await UserModel.findOne({ _id: requestedUserId });

  if (!user)
    throw ServiceError.USER_NOT_FOUND.addContext(
      'requestedUserId - ',
      requestedUserId
    );

  user = user.toObject();

  if (requestedUserId !== requestingUserId) {
    OWNER_LIMITED_FIELDS.forEach((field) => delete user[field]);
  }

  return user;
}

export async function getUsers(userIds, requestingUserId) {
  console.debug(
    `SERVICE: getUsers service running: userIds - ${userIds} requested by ${requestingUserId}`
  );

  const users = [];

  await Promise.all(
    userIds.map(async (userId) => {
      const user = await getUser(userId, requestingUserId);
      users.push(user);
    })
  );

  return users;
}

export async function registerUser(userData, imageFiles) {
  console.debug(
    `SERVICE - registerUser service running: userData - ${JSON.stringify(
      userData
    )}`
  );
  const {
    userId,
    firstName,
    lastName,
    phone,
    location,
    driverLicenseId,
    ...vehicleData
  } = userData;

  // Store images
  const imageIds = [];
  await Promise.all(
    imageFiles.map(async (image) => {
      const imageId = await saveImage(image);
      imageIds.push(imageId);
    })
  );
  if (imageIds.length > 0) vehicleData.imageIds = imageIds;

  // Create User
  let user = null;
  try {
    user = await UserModel({
      _id: userId,
      firstName,
      lastName,
      phone,
      location,
      driverLicenseId,
      ...(driverLicenseId === undefined ? {} : { vehicleData: vehicleData }),
      verificationStatus: 'Not Applied',
    });
    console.log(user);
    const response = await user.save();
    return response;
  } catch (e) {
    throw ServiceError.INVALID_USER_RECEIVED.addContext(e.stack);
  }
}

export async function updateUser(userId, userData, userImages) {
  console.debug(`SERVICE: updateUser service runnning: userId - ${userId}`);
  console.log(userData, userImages);
  // Retrieve original user
  const originalUser = await UserModel.findById(userId);
  if (!originalUser) {
    throw ServiceError.USER_NOT_FOUND;
  }

  // Ensure updated fields are only getting updated
  userData = filterObject(userData, FIELDS_USER_PERMITTED_TO_UPDATE);
  if (userData.vehicleData) {
    const vehicleData = JSON.parse(userData.vehicleData);
    userData.vehicleData = vehicleData;
    console.log(userData);
    if (userImages) {
      // Delete existing images
      const existingImageIds = originalUser.imageIds;
      if (existingImageIds) {
        await Promise.all(
          existingImageIds.map(async (imageId) => {
            await deleteImage(imageId);
          })
        );
      }

      // Add new images
      const newImageIds = [];
      await Promise.all(
        userImages.map(async (image) => {
          const imageId = await saveImage(image);
          newImageIds.push(imageId);
        })
      );

      userData.vehicleData.imageIds = newImageIds;
    }

    console.log(userData.verificationStatus);
    if (originalUser.verificationStatus === VERIFICATION_STATUS_NOT_APPLIED) {
      console.log('here');
      userData.verificationStatus = 'Applied';
    }

    console.log(userData);
  }

  try {
    return await UserModel.findOneAndUpdate({ _id: userId }, userData);
  } catch (e) {
    throw ServiceError.INVALID_USER_RECEIVED.addContext(e.stack);
  }
}

export async function updateDriverRegistrationStatus(
  userId,
  verificationStatus
) {
  console.debug(
    `SERVICE: updateDriverRegistrationStatus service running: userId = ${userId}, status = ${verificationStatus}`
  );

  const user = await getUser(userId, userId);
  user.verificationStatus = verificationStatus;
  await updateUser(userId, user);
}
