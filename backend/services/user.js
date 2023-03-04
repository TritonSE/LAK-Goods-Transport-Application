/**
 * UserService that manages the User documents in the DB
 */
import UserModel, { OWNER_LIMITED_FIELDS } from '../models/user';
import { ServiceError } from '../errors';
import { saveImage } from './image';

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
    });
  } catch (e) {
    throw ServiceError.INVALID_USER_RECEIVED.addContext(e.stack);
  }
  try {
    const response = await user.save();
    return response;
  } catch (e) {
    throw ServiceError.INVALID_USER_RECEIVED.addContext(e.stack);
  }
}
