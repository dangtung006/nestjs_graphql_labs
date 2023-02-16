import { InputType , Field, ID} from '@nestjs/graphql';

@InputType()
export class AssignStudentsToLessonInput{
    @Field(type => ID)
    lessonId : string;

    @Field(type => [ID])
    studentIds: string[];
}