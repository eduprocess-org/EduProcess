import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAdminRequestDetail } from "./useAdminRequestDetail";
import { useAdminRequestDocuments } from "./useAdminRequestDocuments";
import { useAdminRequestHistory } from "./useAdminRequestHistory";
import { updateRequestStatus } from "../../services/admin/requests/adminRequest.service";
import type { RequestStatus } from "../../types/admin/adminRequest.types";

export function useRequestDetailsUI() {
  const { id: requestId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ── Datos ────────────────────────────────────────────────────
  const {
    data: detail,           // AdminRequestDetail | undefined
    isLoading: detailLoading,
    error: detailError,     // Error | null
  } = useAdminRequestDetail(requestId);

  const {
    data: documents = [],
    isLoading: docsLoading,
  } = useAdminRequestDocuments(requestId);

  const {
    data: history = [],
    isLoading: historyLoading,
  } = useAdminRequestHistory(requestId);

  const loading = detailLoading || docsLoading || historyLoading;

  // ── Convertir undefined a null para el template ─────────────
  const detailOrNull = detail ?? null;
  const errorOrNull = detailError ?? null;

  // ── Estados locales ─────────────────────────────────────────
  const [updating, setUpdating] = useState(false);
  const [comment, setComment] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<RequestStatus | null>(null);

  // ── Lógica de transición ────────────────────────────────────
  const initiateStatusTransition = (nextStatus: RequestStatus) => {
    if (!detail) return;

    const current = detail.status.toLowerCase();
    const allowed: Record<string, RequestStatus[]> = {
      pending: ["in_review"],
      in_review: ["approved", "rejected"],
      approved: [],
      rejected: [],
    };

    const allowedList = allowed[current] || [];
    if (!allowedList.includes(nextStatus)) {
      toast.error(`Cannot transition from ${current} to ${nextStatus.toLowerCase()}.`);
      return;
    }

    setPendingStatus(nextStatus);
    setIsConfirmOpen(true);
  };

  const handleAction = async () => {
    if (!detail || !pendingStatus) return;
    setIsConfirmOpen(false);
    const target = pendingStatus.toLowerCase();
    setPendingStatus(null);

    try {
      setUpdating(true);
      await updateRequestStatus(detail.id, target, comment.trim() || undefined);
      await queryClient.invalidateQueries({ queryKey: ["adminRequestDetail", requestId] });
      await queryClient.invalidateQueries({ queryKey: ["adminRequestHistory", requestId] });
      await queryClient.invalidateQueries({ queryKey: ["adminRequests"] });
      toast.success(`Request marked as ${target.toUpperCase()}.`);
      setComment("");
    } catch (e: any) {
      toast.error(e?.message || "Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  const handleCloseModal = () => {
    setIsConfirmOpen(false);
    setPendingStatus(null);
  };

  // ── Retorno ─────────────────────────────────────────────────
  return {
    // Datos (ahora null en lugar de undefined)
    detail: detailOrNull,
    documents,
    history,
    loading,
    error: errorOrNull,

    // Estados
    updating,
    comment,
    setComment,
    isConfirmOpen,
    pendingStatus,

    // Acciones
    initiateStatusTransition,
    handleAction,
    handleCloseModal,

    // Navegación
    navigateBack: () => navigate("/admin/requests"),
  };
}