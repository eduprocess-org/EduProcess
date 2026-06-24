import { useRequestDetailsUI } from "../../../hooks/admin/useRequestDetailsUI";
import { RequestDetailsTemplate } from "../../../components/templates/RequestDetailsTemplate";

export default function RequestDetailsPage() {
  const ui = useRequestDetailsUI();
  return <RequestDetailsTemplate {...ui} />;
}