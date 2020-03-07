import { Controller, Get, Param, ParseIntPipe, Render, Post, HttpCode, Body, Res } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './students.module';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @Render('students')
  async findAll(): Promise<Record<string, any>> {
    const students = await this.studentsService.findAll();
    return { students };
  }

  @Get(':matriculationNumber')
  async find(@Param('matriculationNumber', new ParseIntPipe()) matriculationNumber): Promise<Student> {
    return await this.studentsService.find(matriculationNumber);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() student: Partial<Student>, @Res() res: any) {
    await this.studentsService.addStudent(student);
    res.append('Location', '/students/' + student.matriculationNumber).send('OK');
  }
}
