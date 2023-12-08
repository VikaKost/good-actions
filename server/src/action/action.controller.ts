import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionDocument } from './action.schema';

@Controller('action')
export class ActionController {
  constructor(private actionService: ActionService) {}

  @Get()
  findAllActions(@Query('userId') userId: string): Promise<ActionDocument[]> {
    return this.actionService.findAll(userId);
  }
  @Post()
  createAction(@Body('user') user: string, @Body('text') text: string) {
    return this.actionService.create(user, text);
  }

  @Get(':id')
  findAction(@Param('id') id: string): Promise<ActionDocument> {
    return this.actionService.find(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('user') user: string,
    @Body('text') text: string,
  ): Promise<ActionDocument> {
    return this.actionService.update(id, user, text);
  }

  @Delete(':id')
  deleten(@Param('id') id: string) {
    return this.actionService.delete(id);
  }
}
