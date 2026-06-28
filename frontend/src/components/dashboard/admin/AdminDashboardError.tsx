interface Props {
  message: string;
}

function AdminDashboardError({ message }: Props) {
  return (
    <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 p-4 text-red-600 dark:text-red-400">
      {message}
    </div>
  );
}

export default AdminDashboardError;