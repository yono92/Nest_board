// src/board/board.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './create-board.dto';
import { UpdateBoardDto } from './update-board.dto';
import { AuthGuard } from '../auth/auth.guard';
import { MeGuard } from '../auth/me.guard';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Board> {
    return this.boardService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.create(createBoardDto);
  }

  @Patch(':id')
  @UseGuards(MeGuard)
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  @UseGuards(MeGuard)
  delete(@Param('id') id: string): Promise<void> {
    return this.boardService.delete(+id);
  }
}
