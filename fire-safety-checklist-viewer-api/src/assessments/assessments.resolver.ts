import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { AssessmentsService } from './assessments.service';
import { Assessment, AssessmentFilter } from './assessments.entity';

@Resolver()
export class AssessmentsResolver {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Query(() => [Assessment])
  async assessments(
    @Args('filter', { type: () => AssessmentFilter, nullable: true })
    filter?: AssessmentFilter,
  ): Promise<Assessment[]> {
    return this.assessmentsService.getAllAssessments(filter);
  }

  @Query(() => Assessment)
  async assessmentById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Assessment> {
    return this.assessmentsService.getAssessmentById(id);
  }
}
