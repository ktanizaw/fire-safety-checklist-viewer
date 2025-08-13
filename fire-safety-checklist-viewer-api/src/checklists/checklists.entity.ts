import {
  Field,
  ObjectType,
  ID,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';

export enum ChecklistStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  DRAFT = 'draft',
  REQUIRES_REVIEW = 'requires_review',
}

export enum ActionItemStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
}

registerEnumType(ChecklistStatus, {
  name: 'ChecklistStatus',
  description: 'The status of a checklist',
});

registerEnumType(ActionItemStatus, {
  name: 'ActionItemStatus',
  description: 'The status of an action item',
});

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

  @Field(() => ActionItemStatus)
  status: ActionItemStatus;
}

@ObjectType()
export class ChecklistItem {
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
export class ChecklistSection {
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

  @Field(() => [ChecklistItem])
  items: ChecklistItem[];
}

@ObjectType()
export class Checklist {
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

  @Field(() => ChecklistStatus)
  status: ChecklistStatus;

  @Field(() => Float)
  overallCompletionPercentage: number;

  @Field()
  lastUpdated: string;

  @Field(() => String, { nullable: true })
  nextReviewDate: string | null;

  @Field(() => Int, { nullable: true })
  pendingActionCount?: number;

  @Field(() => [ChecklistSection])
  sections: ChecklistSection[];
}
