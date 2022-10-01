import { TUserDocument } from '../models/User';

class ChangeService {
  static async getList(user: TUserDocument) {
    return user.changes;
  }

  static async create(user: TUserDocument, data: { cipher: string; iv: string }) {
    user.changes.push({
      cipher: data.cipher,
      iv: data.iv,
    });
    user.save();
  }

  static async deleteList(user: TUserDocument, changeIds: string[]) {
    changeIds.forEach((changeId) => {
      user.changes.id(changeId)?.remove();
    });
    user.save();
  }
}

export default ChangeService;
