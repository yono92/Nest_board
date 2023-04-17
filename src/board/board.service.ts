import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './create-board.dto';
import { UpdateBoardDto } from './update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async findAll(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async findOne(id: number): Promise<Board> {
    const findOneOptions: FindOneOptions<Board> = { where: { id } };
    const board = await this.boardRepository.findOne(findOneOptions);
    if (!board) {
      throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
    }
    return board;
  }

  async create(boardData: CreateBoardDto): Promise<Board> {
    const newBoard = this.boardRepository.create(boardData);
    return await this.boardRepository.save(newBoard);
  }

  async update(id: number, boardData: UpdateBoardDto): Promise<Board> {
    const findOneOptions: FindOneOptions<Board> = { where: { id } };
    await this.boardRepository.update(id, boardData);
    const updatedBoard = await this.boardRepository.findOne(findOneOptions);
    if (!updatedBoard) {
      throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
    }
    return updatedBoard;
  }
  async delete(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
    }
  }
}
