import { useRequestDetailsUI } from "../../../hooks/admin/useRequestDetailsUI";
import { RequestDetailsTemplate } from "../../../components/templates/admin/request/RequestDetailsTemplate";

export default function RequestDetailsPage() {
  const ui = useRequestDetailsUI();

  return (
    <div className="dark:[color-scheme:dark]">
      <RequestDetailsTemplate {...ui} />
    </div>
  );
}