import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserDetails } from './user.interface';
import { FriendService } from 'src/friend/friend.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => FriendService))
    private readonly friendService: FriendService,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async findByTerm(term: string): Promise<UserDocument[] | null> {
    const regex = new RegExp(`^${term}`);
    const users = await this.userModel.find({ username: { $regex: regex } });
    if (!users) return null;

    return users;
  }

  async create(
    username: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async edit(
    id: string,
    email: string,
    username: string,
  ): Promise<UserDetails> {
    const exitingUser = await this.userModel.findById(id);
    exitingUser.email = email ?? exitingUser.email;
    exitingUser.username = username ?? exitingUser.username;
    exitingUser.save();
    return this._getUserDetails(exitingUser);
  }

  async delete(id: string) {
    await this.friendService.deleteAllFriends(id);
    await this.userModel.deleteOne({ _id: id }).exec();
    return 'ok';
  }
}
