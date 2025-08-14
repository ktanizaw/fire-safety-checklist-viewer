import { AssessmentStatus } from "@/gql/graphql";

export const getStatusColor = (
  status: AssessmentStatus
): "blue" | "green" | "yellow" | "red" => {
  switch (status) {
    case AssessmentStatus.InProgress:
      return "blue";
    case AssessmentStatus.Completed:
      return "green";
    case AssessmentStatus.Draft:
      return "yellow";
    case AssessmentStatus.RequiresReview:
      return "red";
  }
};
