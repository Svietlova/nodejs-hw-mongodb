import mongoose, { Schema } from 'mongoose';

const ContactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: false,
      default: 'personal',
    },
    userId: {
      type: String,
      required: true,
      ref: 'users',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const ContactsCollection = mongoose.model('contacts', ContactsSchema);
