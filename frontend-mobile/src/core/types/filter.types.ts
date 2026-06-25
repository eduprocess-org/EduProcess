export interface FilterOption {
  label: string;
  value: string;
}

export const STATUS_OPTIONS: FilterOption[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' },
];

export const SORT_OPTIONS: FilterOption[] = [
  { label: 'Newest', value: 'NEWEST' },
  { label: 'Oldest', value: 'OLDEST' },
];