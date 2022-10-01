import { randomUUID } from 'crypto';

import mongoose from 'mongoose';

export interface ISession {
  _id: string;
  refresh_token: string;
  user_agent: string;
  user: string;
  expires_at: Date;
}

const Session = new mongoose.Schema<ISession>({
  _id: { type: String, default: randomUUID },
  refresh_token: { type: String, required: true },
  user_agent: { type: String, required: true, default: 'unknown' },
  user: { type: String, ref: 'User', required: true },
  expires_at: { type: Date, required: true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

export default mongoose.model('Session', Session);
