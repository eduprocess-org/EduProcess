import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProcedureCreationPage from "../ProcedureCreationPage";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockCreate = vi.fn();
vi.mock("../../../../services/admin/procedures/procedures.service", () => ({
  adminProceduresApi: {
    create: (...args: any[]) => mockCreate(...args),
  },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

describe("EDUPR-229: Procedure Creation Page", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  it("should block submission and display validation messages when fields are empty", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProcedureCreationPage />
      </QueryClientProvider>
    );

    const submitButton = screen.getByRole("button", { name: /deploy procedure/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText("The procedure name is required.")).toBeInTheDocument();
    expect(screen.getByText("The description is required.")).toBeInTheDocument();
    expect(screen.getByText("Please specify at least one requirement.")).toBeInTheDocument();
  });

  it("should allow dynamic addition of multiple requirements", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProcedureCreationPage />
      </QueryClientProvider>
    );

    const addRequirementButton = screen.getByRole("button", { name: /add requirement/i });

    expect(screen.getByPlaceholderText("Requirement #1")).toBeInTheDocument();

    fireEvent.click(addRequirementButton);
    expect(screen.getByPlaceholderText("Requirement #2")).toBeInTheDocument();
  });

  it("should submit form data successfully when validation passes", async () => {
    mockCreate.mockResolvedValue({ data: { id: "new-1" } });

    render(
      <QueryClientProvider client={queryClient}>
        <ProcedureCreationPage />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("e.g., Degree Verification Protocol"), {
      target: { value: "Syllabus Certification Protocol" },
    });
    fireEvent.change(screen.getByPlaceholderText("Summarize the core purpose of this procedure..."), {
      target: { value: "Validation workflow for internal university academic layout." },
    });
    fireEvent.change(screen.getByPlaceholderText("Requirement #1"), {
      target: { value: "Approved digital academic record" },
    });

    const submitButton = screen.getByRole("button", { name: /deploy procedure/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("The procedure name is required.")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalled();
    });
  });
});
