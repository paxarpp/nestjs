import { Module, HttpModule } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

export interface Student {
  matriculationNumber: number;
  name: string;
}

@Module({
  imports: [HttpModule],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
