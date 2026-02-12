export const MaintenanceReasons = {
  UPDATE: 'update',
  PERFORMANCE: 'performance',
  CONSTRUCTION: 'construction',
} as const;

export type MaintenanceReason = (typeof MaintenanceReasons)[keyof typeof MaintenanceReasons];
