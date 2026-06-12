import { mockProcedures } from "../../mocks/procedures.mock";

export const getProcedures = async () => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return mockProcedures;
};