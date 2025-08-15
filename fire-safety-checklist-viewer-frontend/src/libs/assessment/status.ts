type AssessmentStatusColor = 'blue' | 'green' | 'yellow' | 'red';
type AssessmentStatusText =
  | 'Completed'
  | 'In Progress'
  | 'Draft'
  | 'Requires Review';
type AssessmentStatus = {
  color: AssessmentStatusColor;
  text: AssessmentStatusText;
  icon: string;
};

type ActionItemStatusColor = 'yellow' | 'blue';
type ActionItemStatusText = 'Pending' | 'In Progress';
type ActionItemStatus = {
  color: ActionItemStatusColor;
  text: ActionItemStatusText;
};

export const ASSESSMENT_STATUS_OPTIONS = [
  { label: 'All Statuses', value: '' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Draft', value: 'draft' },
  { label: 'Requires Review', value: 'requires_review' },
];

export const getActionItemStatusData = (status: string): ActionItemStatus => {
  const map: Record<string, ActionItemStatus> = {
    pending: { color: 'yellow', text: 'Pending' },
    in_progress: { color: 'blue', text: 'In Progress' },
  };

  return map[status] ?? { color: 'yellow', text: 'Pending' };
};

export const getAssessmentStatusData = (status: string): AssessmentStatus => {
  const map: Record<string, AssessmentStatus> = {
    completed: {
      color: 'green',
      text: 'Completed',
      icon: 'mdi:check-circle-outline',
    },
    in_progress: {
      color: 'blue',
      text: 'In Progress',
      icon: 'mdi:clock-time-four-outline',
    },
    draft: {
      color: 'yellow',
      text: 'Draft',
      icon: 'mdi:file-edit-outline',
    },
    requires_review: {
      color: 'red',
      text: 'Requires Review',
      icon: 'mdi:eye-outline',
    },
  };

  return (
    map[status] ?? {
      color: 'blue',
      text: 'In Progress',
      icon: 'mdi:clock-time-four-outline',
    }
  );
};
