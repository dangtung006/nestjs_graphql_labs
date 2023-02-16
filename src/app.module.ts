import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join} from 'path';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      playground : true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver : ApolloDriver,
    }),
  LessonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
