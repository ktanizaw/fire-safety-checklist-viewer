import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AssessmentsResolver } from './assessments.resolver';

@Module({
  controllers: [],
  providers: [AssessmentsService, AssessmentsResolver],
})
export class AssessmentsModule {}
