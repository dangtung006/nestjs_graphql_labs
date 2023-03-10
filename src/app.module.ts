import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join} from 'path';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/lesson.entity';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type : 'mongodb',
            url : 'mongodb://localhost/school',
            synchronize : true,
            useUnifiedTopology : true,
            entities : [ Lesson, Student ]
        }),

        GraphQLModule.forRoot<ApolloDriverConfig>({
            playground : true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            driver : ApolloDriver,
        }),

        LessonModule,

        StudentModule
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
