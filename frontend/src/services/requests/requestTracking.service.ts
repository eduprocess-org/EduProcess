import { mockRequestTracking }
  from "../../mocks/request-tracking.mock";

export async function getRequestTracking(
  requestId: string
) {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  const request =
    mockRequestTracking.find(
      (item: { requestId: string }) => item.requestId === requestId
    );

  if (!request) {
    throw new Error(
      "Request not found"
    );
  }

  return request;
}