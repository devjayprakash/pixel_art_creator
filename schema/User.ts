import { Schema, model, models } from 'mongoose';

export interface UserType {
  _id: string;
  name: string;
  clerk_id: string;
  image_url?: string;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  clerk_id: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
});

const UserModal = models.User || model('User', UserSchema);

export default UserModal;
