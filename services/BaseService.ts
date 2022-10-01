import { randomUUID } from 'crypto';

import { TUserDocument } from '../models/User';

import ChangeService from './ChangeService';

interface SetBaseBodyProps {
  iv: string;
  cipher: string;
  change_ids: string[];
}

class BaseService {
  static async get(user: TUserDocument) {
    return user.base;
  }

  static async create(user: TUserDocument, data: SetBaseBodyProps) {
    await ChangeService.deleteList(user, data.change_ids);

    const baseId = randomUUID();
    await user.updateOne({
      base: {
        _id: baseId,
        iv: data.iv,
        cipher: data.cipher,
      },
    });

    return baseId;
  }
}

export default BaseService;
