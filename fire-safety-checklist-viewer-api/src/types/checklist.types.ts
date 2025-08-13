type ChecklistStatus =
  | 'draft'
  | 'in_progress'
  | 'completed'
  | 'requires_review'
  | 'pending';

type ActionItem = {
  id: string;
  deficiency: string;
  proposedAction: string;
  timescale: string;
  personResponsible: string;
  priority: string;
  status: ChecklistStatus;
};

type ChecklistItem = {
  id: string;
  question: string;
  response: Maybe<string>;
  requiresAction: boolean;
  lastUpdated: Maybe<string>;
  helpText?: string;
  notes?: string;
  actionItem?: ActionItem;
};

type ChecklistSection = {
  id: string;
  title: string;
  description: string;
  order: number;
  completionPercentage: number;
  items: ChecklistItem[];
};

export type Checklist = {
  id: string;
  buildingName: string;
  address: string;
  responsiblePerson: string;
  assessor: Maybe<string>;
  dateOfAssessment: Maybe<string>;
  useOfPremises: string;
  numberOfFloors: number;
  construction: string;
  maxOccupancy: number;
  status: ChecklistStatus;
  overallCompletionPercentage: number;
  lastUpdated: string;
  nextReviewDate: Maybe<string>;
  sections: ChecklistSection[];
};

export type ChecklistSummary = {
  id: string;
  buildingName: string;
  address: string;
  status: ChecklistStatus;
  overallCompletionPercentage: number;
  lastUpdated: string;
  pendingActionCount: number;
};
