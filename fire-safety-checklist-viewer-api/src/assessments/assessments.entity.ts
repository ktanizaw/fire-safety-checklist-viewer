import {
  Field,
  ObjectType,
  ID,
  Int,
  Float,
  registerEnumType,
  InputType,
} from '@nestjs/graphql';
import { SortOrder } from '@/enums/sort.enum';

export enum AssessmentStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  DRAFT = 'draft',
  REQUIRES_REVIEW = 'requires_review',
}

export enum ActionItemStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
}

registerEnumType(AssessmentStatus, {
  name: 'AssessmentStatus',
  description: 'The status of an assessment',
});

registerEnumType(ActionItemStatus, {
  name: 'ActionItemStatus',
  description: 'The status of an action item',
});

@InputType()
export class AssessmentFilter {
  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => String, { nullable: true })
  searchQuery?: string;
}

@InputType()
export class AssessmentSort {
  @Field(() => SortOrder, { nullable: true })
  overallCompletionPercentage?: SortOrder;
}

@ObjectType()
export class ActionItem {
  @Field(() => ID)
  id: string;

  @Field()
  deficiency: string;

  @Field()
  proposedAction: string;

  @Field()
  timescale: string;

  @Field()
  personResponsible: string;

  @Field()
  priority: string;

  @Field()
  status: string;
}

@ObjectType()
export class AssessmentItem {
  @Field(() => ID)
  id: string;

  @Field()
  question: string;

  @Field(() => String, { nullable: true })
  response: string | null;

  @Field()
  requiresAction: boolean;

  @Field(() => String, { nullable: true })
  lastUpdated: string | null;

  @Field(() => String, { nullable: true })
  helpText?: string;

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => ActionItem, { nullable: true })
  actionItem?: ActionItem;
}

@ObjectType()
export class AssessmentSection {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  order: number;

  @Field(() => Float)
  completionPercentage: number;

  @Field(() => Int, { nullable: true })
  pendingActionCount?: number;

  @Field(() => [AssessmentItem])
  items: AssessmentItem[];
}

@ObjectType()
export class Assessment {
  @Field(() => ID)
  id: string;

  @Field()
  buildingName: string;

  @Field()
  address: string;

  @Field()
  responsiblePerson: string;

  @Field(() => String, { nullable: true })
  assessor: string | null;

  @Field(() => String, { nullable: true })
  dateOfAssessment: string | null;

  @Field()
  useOfPremises: string;

  @Field(() => Int)
  numberOfFloors: number;

  @Field()
  construction: string;

  @Field(() => Int)
  maxOccupancy: number;

  @Field()
  status: string;

  @Field(() => Float)
  overallCompletionPercentage: number;

  @Field()
  lastUpdated: string;

  @Field(() => String, { nullable: true })
  nextReviewDate: string | null;

  @Field(() => Int, { nullable: true })
  pendingActionCount?: number;

  @Field(() => [AssessmentSection])
  sections: AssessmentSection[];
}
