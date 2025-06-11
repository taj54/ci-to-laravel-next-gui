
/**
 * Fetch wrapper that aborts the request if it exceeds the specified timeout.
 *
 * @param resource - The URL or Request object to fetch.
 * @param options - Fetch options.
 * @param timeout - Timeout in milliseconds (default 15 seconds).
 * @returns The fetch Response object.
 * @throws Throws an AbortError if the request times out.
 */
export async function fetchWithTimeout(
  resource: RequestInfo,
  options: RequestInit = {},
  timeout = 15000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
