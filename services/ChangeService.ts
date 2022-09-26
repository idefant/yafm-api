import prisma from '../prisma/prisma-client';

class ChangeService {
  static getList(userId: string) {
    return prisma.change.findMany({
      where: {
        user_id: {
          equals: userId,
        },
      },
    });
  }

  static async create(userId: string, data: { cipher: string; iv: string }) {
    await prisma.change.create({
      data: {
        cipher: data.cipher,
        iv: data.iv,
        user_id: userId,
      },
    });
  }

  static async deleteList(userId: string, changeIds: string[]) {
    await prisma.change.deleteMany({
      where: {
        user_id: {
          equals: userId,
        },
        id: {
          in: changeIds,
        },
      },
    });
  }
}

export default ChangeService;
