import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Get()
  findFriend(
    @Query('userId') userId: string,
    @Query('term') term: string,
  ): Promise<{ id: string; username: string }[]> {
    return this.friendService.findUsers(userId, term);
  }

  @Post()
  addFriend(
    @Body('userId') userId: string,
    @Body('friendId') friendId: string,
  ) {
    return this.friendService.addFriend(userId, friendId);
  }

  @Get(':userId')
  getFriends(
    @Param('userId') userId: string,
  ): Promise<{ id: string; username: string }[]> {
    return this.friendService.getFriends(userId);
  }

  @Delete(':userId')
  deleteFriend(
    @Param('userId') userId: string,
    @Query('friendId') friendId: string,
  ): Promise<string> {
    return this.friendService.deleteFriend(userId, friendId);
  }
}
