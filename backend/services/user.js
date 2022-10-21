/**
 * UserService that manages the User documents in the DB
 */
import UserModel, { PUBLICLY_VISIBLE_FIELDS } from "../models/user";
import { InternalError, ServiceError } from "../errors";
import { filterObject } from "../helpers";

export async function getUsers(userIds) {
    console.debug(`SERVICE: getUsers service running: userIds - ${userIds}`);

    const users = [];
    for (let userId of userIds) {
        let user = await UserModel.findById(userId);
        if (!user) throw ServiceError.USER_NOT_FOUND.addContext('userId - ', userId);
        users.push(filterObject(user, PUBLICLY_VISIBLE_FIELDS));
    }
    return users;
}