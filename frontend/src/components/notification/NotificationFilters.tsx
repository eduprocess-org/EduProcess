interface NotificationFiltersProps {
  value: "ALL" | "READ" | "UNREAD";
  onChange: (value: "ALL" | "READ" | "UNREAD") => void;
}

const filters = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Unread",
    value: "UNREAD",
  },
  {
    label: "Read",
    value: "READ",
  },
] as const;

export default function NotificationFilters({
  value,
  onChange,
}: NotificationFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            transition-colors

            ${
              value === filter.value
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}