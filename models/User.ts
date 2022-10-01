import { randomUUID } from 'crypto';

import mongoose, { Document, Types } from 'mongoose';

import { ISession } from './Session';

interface IBase {
  _id: string;
  cipher: string;
  iv: string;
}

interface IChange {
  _id: string;
  cipher: string;
  iv: string;
}

interface IUser {
  _id: string;
  username: string;
  password_hash: string;
  salt: string;
  sessions: Types.DocumentArray<ISession>;
  base: Types.Subdocument<IBase>;
  changes: Types.DocumentArray<IChange>;
}

const Base = new mongoose.Schema<IBase>({
  _id: { type: String, default: randomUUID },
  cipher: { type: String, required: true },
  iv: { type: String, required: true },
}, {
  timestamps: {
    createdAt: false,
    updatedAt: 'updated_at',
  },
});

const Change = new mongoose.Schema<IChange>({
  _id: { type: String, default: randomUUID },
  cipher: { type: String, required: true },
  iv: { type: String, required: true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: false,
  },
});

const User = new mongoose.Schema<IUser>({
  _id: { type: String, default: randomUUID },
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  salt: { type: String, required: true },
  sessions: [{ type: String, ref: 'Session' }],
  base: { type: Base, required: false },
  changes: [Change],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

export type TUserDocument = Document<unknown, any, IUser> & IUser & Required<{ _id: string }>;

export default mongoose.model('User', User);
