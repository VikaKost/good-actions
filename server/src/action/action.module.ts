import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionSchema } from './action.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Action', schema: ActionSchema }]),
    UserModule,
  ],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
