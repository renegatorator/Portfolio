// Safely parse a fetch Response body as JSON. Centralizes the unavoidable cast and returns
// null on malformed/empty bodies so callers can handle failures without try/catch noise.
export const parseJsonResponse = async <T>(response: Response): Promise<T | null> => {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
};
