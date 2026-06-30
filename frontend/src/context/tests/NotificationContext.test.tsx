import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";

// ✅ MOCK SIN VARIABLES EXTERNAS (IMPORTANTE)
vi.mock("../../services/api/apiClient", () => ({
  apiClient: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

// 🔥 IMPORT DESPUÉS DEL MOCK
import { apiClient } from "../../services/api/apiClient";
import { NotificationProvider, useNotifications } from "../NotificationContext";

describe("NotificationContext", () => {
  const wrapper = ({ children }: any) => (
    <NotificationProvider>{children}</NotificationProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 🧪 1. FETCH
  it("loads notifications correctly", async () => {
    (apiClient.get as any).mockResolvedValue({
      data: [
        {
          id: "1",
          title: "Test",
          description: "Test",
          type: "INFO",
          read: false,
          createdAt: "2026-01-01",
        },
      ],
    });

    const { result } = renderHook(() => useNotifications(), { wrapper });

    await act(async () => {
      await result.current.fetchNotifications();
    });

    expect(result.current.notifications.length).toBe(1);
  });

  // 🧪 2. MARK AS READ
  it("marks as read", async () => {
    (apiClient.patch as any).mockResolvedValue({});

    const { result } = renderHook(() => useNotifications(), { wrapper });

    await act(async () => {
      await result.current.markAsRead("1");
    });

    expect(apiClient.patch).toHaveBeenCalled();
  });

  // 🧪 3. MARK ALL
  it("marks all as read", async () => {
    (apiClient.patch as any).mockResolvedValue({});

    const { result } = renderHook(() => useNotifications(), { wrapper });

    await act(async () => {
      await result.current.markAllAsRead();
    });

    expect(apiClient.patch).toHaveBeenCalled();
  });

  // 🧪 4. ERROR
  it("handles error", async () => {
    (apiClient.get as any).mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useNotifications(), { wrapper });

    await act(async () => {
      await result.current.fetchNotifications();
    });

    expect(result.current.error).toBeTruthy();
  });
});