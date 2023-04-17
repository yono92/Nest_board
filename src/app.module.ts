// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { BoardModule } from './board/board.module';
import { Board } from './board/board.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: [Board], // Board 엔티티를 등록합니다.
    }),
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
