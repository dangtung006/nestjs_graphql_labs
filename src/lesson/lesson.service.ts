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

    async createLesson(createLessonInput : CreateLessonInput): Promise<Lesson>{
        const { name , startDate, endDate } = createLessonInput;
        
        const lesson = this.lessonRepository.create({
            id : uuid(),
            name,
            startDate,
            endDate
        })

        return await this.lessonRepository.save(lesson);
    }
}
