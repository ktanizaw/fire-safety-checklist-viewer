import { Field, ObjectType, ID, Int, Float } from '@nestjs/graphql';

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

  @Field(() => [ChecklistSection])
  sections: ChecklistSection[];
}
