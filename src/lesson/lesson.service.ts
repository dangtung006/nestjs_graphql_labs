import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository : Repository<Lesson>
    ){}
    
    async getLesson(_id: string): Promise<Lesson>{
        let data = await this.lessonRepository.findOneBy({ id : _id });
        return data
    }

    async getLessons(): Promise<Lesson[]>{
        const lessons = await this.lessonRepository.find();
        return lessons;
    }

    async createLesson(createLessonInput : CreateLessonInput): Promise<Lesson>{
        const { name , startDate, endDate, students } = createLessonInput;

        const lesson = this.lessonRepository.create({
            id : uuid(),
            name,
            startDate,
            endDate,
            students
        })

        return await this.lessonRepository.save(lesson);
    }

    async assignStudentsToLesson(lessonId: string, studentIds: string[]):Promise<Lesson>{
        const lesson = await this.lessonRepository.findOneBy({ id : lessonId});
        lesson.students = [...lesson.students, ...studentIds]
        return await this.lessonRepository.save(lesson);
    }
}
