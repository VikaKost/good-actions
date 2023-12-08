import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendDocument } from './friend.schema';
import { UserService } from 'src/user/user.service';
import mongoose from 'mongoose';

@Injectable()
export class FriendService {
  constructor(
    @InjectModel('Friend')
    private readonly FriendModel: Model<FriendDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async findUsers(
    userId: string,
    term: string,
  ): Promise<{ id: string; username: string }[]> {
    const users = await this.userService.findByTerm(term);
    const friends = await this.FriendModel.find({
      user: new mongoose.Types.ObjectId(userId),
    });
    console.log('users:', users);
    console.log('friends:', friends);
    const nonFriends = users.filter((user) => {
      return (
        !friends.some(
          (friend) => friend.friend.toString() === user._id.toString(),
        ) && user._id.toString() !== userId.toString()
      );
    });
    const res = nonFriends.map((user) => ({
      id: user._id,
      username: user.username,
    }));

    return res;
  }

  async addFriend(userId: string, friendId: string): Promise<string> {
    const newFriend = new this.FriendModel({
      user: new mongoose.Types.ObjectId(userId),
      friend: new mongoose.Types.ObjectId(friendId),
    });
    newFriend.save();
    return 'ok';
  }

  async getFriends(
    userId: string,
  ): Promise<{ id: string; username: string }[]> {
    const users = await this.FriendModel.find({
      user: new mongoose.Types.ObjectId(userId),
    });
    console.log(users);
    const friends = await Promise.all(
      users.map(async (user) => {
        const friend = await this.userService.findById(user.friend);
        return { id: friend.id, username: friend.username };
      }),
    );
    return friends;
  }

  async deleteFriend(userId: string, friendId: string) {
    this.FriendModel.deleteOne({
      user: new mongoose.Types.ObjectId(userId),
      friend: new mongoose.Types.ObjectId(friendId),
    }).exec();
    return 'ok';
  }

  async deleteAllFriends(userId: string) {
    this.FriendModel.deleteMany({
      user: new mongoose.Types.ObjectId(userId),
    }).exec();
    this.FriendModel.deleteMany({
      friend: new mongoose.Types.ObjectId(userId),
    }).exec();
    return 'ok';
  }
}
