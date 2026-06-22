interface Props {
  message: string;
}

function AdminDashboardError({
  message,
}: Props) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
      {message}
    </div>
  );
}

export default AdminDashboardError;