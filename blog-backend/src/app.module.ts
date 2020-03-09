import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    // forRoot() для подключения к базе данных
    // mongoose в docker
    MongooseModule.forRoot('mongodb://localhost:32769', { useNewUrlParser: true }),
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
