import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { Student } from './students.module';
import { map } from 'rxjs/operators';

@Injectable()
export class StudentsService {
  private _cachedStudents: Student[];
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Student[]> {
    return this._getStudents();
  }

  async find(matrNr: number): Promise<Student | undefined> {
    const students = await this._getStudents();
    return students.find(s => s.matriculationNumber === matrNr);
  }

  private async _getStudents(): Promise<Student[]> {
    if (!this._cachedStudents) {
      this._cachedStudents = await this._fetchStudents();
    }
    return Promise.resolve(this._cachedStudents);
  }

  private async _fetchStudents(): Promise<Student[]> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/users')
    .pipe(
      map(res => res.data.map(user => ({
        matriculationNumber: user.id,
        name: user.name,
      })))
    ).toPromise();
  }
  async addStudent(student: Partial<Student>): Promise<any> {
    return await this._safeAddStudent(student);
  }

  private async _safeAddStudent(student: Partial<Student>, fetchIfEmpty = true): Promise<any> {
    if  (!student.name || !student.matriculationNumber) {
      throw new HttpException({ error: 'Not a valid student!' }, 400);
    }

    if (!this._cachedStudents) {
      this._cachedStudents = fetchIfEmpty ? (await this._fetchStudents()) : [];
    }

    return Promise.resolve(this._cachedStudents.push(student as Student));
  }
}
