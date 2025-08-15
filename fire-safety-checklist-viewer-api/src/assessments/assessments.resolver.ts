import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { AssessmentsService } from './assessments.service';
import {
  Assessment,
  AssessmentFilter,
  AssessmentSort,
} from './assessments.entity';

@Resolver()
export class AssessmentsResolver {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Query(() => [Assessment])
  assessments(
    @Args('filter', { type: () => AssessmentFilter, nullable: true })
    filter?: AssessmentFilter,
    @Args('sort', { type: () => AssessmentSort, nullable: true })
    sort?: AssessmentSort,
  ): Assessment[] {
    return this.assessmentsService.getAllAssessments(filter, sort);
  }

  @Query(() => Assessment)
  assessmentById(@Args('id', { type: () => ID }) id: string): Assessment {
    return this.assessmentsService.getAssessmentById(id);
  }
}
