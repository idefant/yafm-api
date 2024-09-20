import prisma from '../prisma';
import { Token } from '../types/tokenType';

interface SetCommitBodyProps {
  iv: string;
  cipher: string;
  hmac: string;
  salt: string;
}

class CommitService {
  static async getList(token: Token, data: { syncedAtFrom: string }) {
    const commits = await prisma.commit.findMany({
      where: {
        userId: token.sub,
        syncedAt: {
          gt: data.syncedAtFrom,
        },
      },
      orderBy: { syncedAt: 'asc' },
    });
    return commits;
  }

  static async create(token: Token, data: SetCommitBodyProps) {
    const commit = await prisma.commit.create({
      data: { ...data, userId: token.sub },
    });

    return commit;
  }
}

export default CommitService;
