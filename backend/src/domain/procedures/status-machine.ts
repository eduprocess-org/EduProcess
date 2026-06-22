export const VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['in_review'],
  in_review: ['approved', 'rejected'],
  approved: [],
  rejected: [],
};

<<<<<<< HEAD
export function isTransitionValid(from: string, to: string): boolean {
  const allowed = VALID_TRANSITIONS[from];
  if (!allowed) return false;
  return allowed.includes(to);
=======
export function normalizeStatus(status: string): string {
  return status.toLowerCase().trim();
}

export function isTransitionValid(from: string, to: string): boolean {
  const normalizedFrom = normalizeStatus(from);
  const normalizedTo = normalizeStatus(to);
  const allowed = VALID_TRANSITIONS[normalizedFrom];
  if (!allowed) return false;
  return allowed.includes(normalizedTo);
>>>>>>> qa
}

export function getNextPossibleStatuses(current: string): string[] {
  return VALID_TRANSITIONS[current] ?? [];
}

export const STATUS_LABELS: Record<string, string> = {
  pending: 'Submitted',
  in_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
};
