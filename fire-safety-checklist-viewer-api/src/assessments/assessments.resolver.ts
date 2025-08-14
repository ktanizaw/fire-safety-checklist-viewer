import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { AssessmentsService } from './assessments.service';
import { Assessment } from './assessments.entity';

@Resolver()
export class AssessmentsResolver {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Query(() => [Assessment])
  async assessments(): Promise<Assessment[]> {
    return this.assessmentsService.getAllAssessments();
  }

  @Query(() => Assessment)
  async assessmentById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Assessment> {
    return this.assessmentsService.getAssessmentById(id);
  }
}
