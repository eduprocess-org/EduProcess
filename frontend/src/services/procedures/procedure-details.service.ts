import { mockProcedureDetails } from "../../mocks/procedure-details.mock";

export async function getProcedureDetails(
  id: string
) {
  await new Promise(
    (resolve) =>
      setTimeout(resolve, 1000)
  );

  const procedure =
    mockProcedureDetails.find(
      (item) => item.id === id
    );

  if (!procedure) {
    throw new Error(
      "Procedure not found"
    );
  }

  return procedure;
}