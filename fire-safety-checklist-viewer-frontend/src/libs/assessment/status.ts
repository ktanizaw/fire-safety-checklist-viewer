export const getStatusColor = (
  status: string
): "blue" | "green" | "yellow" | "red" => {
  switch (status) {
    case "in_progress":
      return "blue";
    case "completed":
      return "green";
    case "draft":
      return "yellow";
    case "requires_review":
      return "red";
    default:
      return "blue";
  }
};

export const STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Draft", value: "draft" },
  { label: "Requires Review", value: "requires_review" },
];
