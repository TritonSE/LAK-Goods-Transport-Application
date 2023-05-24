import {updateDriverRegistrationStatus} from './user'
import { ObjectId } from 'mongodb';

const userId = "ChDZToaifVdO0hbx1KMYi57GK4K3"
const res = await updateDriverRegistrationStatus(userId, "Disapproved", "Because I said so!")