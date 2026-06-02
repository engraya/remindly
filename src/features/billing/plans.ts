export const PLANS = {
  free: {
    id: "free",
    name: "Free",
    maxCollections: 10,
    aiTasksPerDay: 5,
  },
  pro: {
    id: "pro",
    name: "Pro",
    maxCollections: 100,
    aiTasksPerDay: 100,
  },
} as const;

export type PlanId = keyof typeof PLANS;
