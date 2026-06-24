import { useNavigate } from "react-router-dom";
import { useRequestManagementUI } from "../../../hooks/admin/useRequestManagementUI";
import { RequestManagementTemplate } from "../../../components/templates/admin/request/RequestManagementTemplate";

export default function RequestManagementPage() {
  const navigate = useNavigate();
  const ui = useRequestManagementUI();

  return (
    <RequestManagementTemplate
      {...ui}
      onViewRequest={(id) => navigate(`/admin/requests/${id}`)}
    />
  );
}