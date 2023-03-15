import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username already exists'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});

export const User = mongoose.model('User', UserSchema);
