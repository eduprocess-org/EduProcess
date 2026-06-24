// src/pages/admin/requests/RequestDetailsPage.tsx
import { useRequestDetailsUI } from "../../../hooks/admin/useRequestDetailsUI";
import { RequestDetailsTemplate } from "../../../components/templates/admin/request/RequestDetailsTemplate";

export default function RequestDetailsPage() {
  const ui = useRequestDetailsUI();
  return <RequestDetailsTemplate {...ui} />;
}