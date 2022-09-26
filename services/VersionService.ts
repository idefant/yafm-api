import HttpException from '../models/HttpException';
import prisma from '../prisma/prisma-client';

import ChangeService from './ChangeService';

class VersionService {
  static getList(userId: string) {
    return prisma.version.findMany({
      where: {
        user_id: {
          equals: userId,
        },
      },
      select: {
        id: true,
        created_at: true,
      },
    });
  }

  static async getById(userId: string, versionId: string) {
    const version = await prisma.version.findUnique({
      where: {
        id: versionId,
      },
    });

    if (!version || version.user_id !== userId) {
      throw new HttpException(404, 'Version not found');
    }
    return version;
  }

  static getLast(userId: string) {
    return prisma.version.findFirst({
      where: {
        user_id: {
          equals: userId,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  static async create(userId: string, data: { iv: string; cipher: string; changeIds: string[] }) {
    await ChangeService.deleteList(userId, data.changeIds);

    const version = await prisma.version.create({
      data: {
        iv: data.iv,
        cipher: data.cipher,
        user_id: userId,
      },
    });

    return version.id;
  }
}

export default VersionService;
