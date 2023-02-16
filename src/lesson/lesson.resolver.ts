import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './asignStudents.input';
import { LessonService } from './lesson.service';
import { StudentService } from './../student/student.service';
import { LessonType } from "./lesson.type";
import { Lesson } from './lesson.entity';

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(
        private lessonService : LessonService,
        private studentService : StudentService
    ){}

    @Query(returns => LessonType)
    lesson(
        @Args('_id') _id : string
    ){
        return this.lessonService.getLesson(_id)
    }

    @Query(returns => [LessonType])
    lessons(){
        return this.lessonService.getLessons()
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput : CreateLessonInput
    ){
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput : AssignStudentsToLessonInput
    ){
        const { lessonId, studentIds } = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    }

    @ResolveField()
    async students(@Parent() lesson : Lesson){
        return this.studentService.getStudentByIds(lesson.students)
    }
}
