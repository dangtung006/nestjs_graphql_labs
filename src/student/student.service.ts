import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { v4 as uuid } from 'uuid';
import { In } from 'typeorm'


@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository : Repository<Student>
    ){}

    async createStudent(createStudentInput : CreateStudentInput): Promise<Student>{
        const { firstName , lastName } = createStudentInput;
        const student = this.studentRepository.create({
            id : uuid(),
            firstName,
            lastName
        });

        return await this.studentRepository.save(student);
    }

    async getStudents(): Promise<Student[]>{
        return await this.studentRepository.find();
    }

    async getStudent(_id: string): Promise<Student>{
        let data = await this.studentRepository.findOneBy({ id : _id });
        return data;
    }

    async getStudentByIds(studentIds : string[]): Promise<Student[]>{
        let students = await this.studentRepository.findBy({ id : In(studentIds) })
        return students;
    }
}
