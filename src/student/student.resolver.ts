import { Query } from '@nestjs/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import {StudentType } from './student.type';

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(
        private studentService: StudentService
    ){}

    @Query(returns => StudentType)
    async student(
        @Args('_id') _id : string
    ){
        return this.studentService.getStudent(_id)
    }

    @Query(returns => [StudentType])
    async students(){
        return this.studentService.getStudents()
    }

    @Mutation(returns => StudentType)
    async createStudent(
        @Args('createStudentInput') createStudentInput : CreateStudentInput
    ){
        return this.studentService.createStudent(createStudentInput);
    }
}
