import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActionDocument } from './action.schema';
import { UserService } from 'src/user/user.service';
import mongoose from 'mongoose';

@Injectable()
export class ActionService {
  constructor(
    @InjectModel('Action')
    private readonly actionModel: Model<ActionDocument>,
    private readonly userService: UserService,
  ) {}

  async create(user: string, text: string): Promise<ActionDocument> {
    const newAction = new this.actionModel({
      user: new mongoose.Types.ObjectId(user),
      text,
    });
    return newAction.save();
  }

  async findAll(userId: string): Promise<ActionDocument[]> {
    return this.actionModel
      .find({ user: new mongoose.Types.ObjectId(userId) })
      .exec();
  }

  async find(id: string): Promise<ActionDocument> {
    return this.actionModel.findById(id).exec();
  }

  async update(
    id: string,
    newUser: string,
    newText: string,
  ): Promise<ActionDocument> {
    const exitingAction = await this.actionModel.findById(id);
    exitingAction.user = newUser ?? exitingAction.user;
    exitingAction.text = newText ?? exitingAction.text;

    return exitingAction.save();
  }

  async delete(id: string) {
    return this.actionModel.deleteOne({ _id: id }).exec();
  }
}
