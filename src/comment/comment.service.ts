import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  findUserComments(userId: string) {
    return `This action returns all comments of user ${userId}`;
  }
}
