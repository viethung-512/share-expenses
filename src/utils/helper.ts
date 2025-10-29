export function throwApiError(statusCode: number, err: any) {
  return new Response(JSON.stringify({ error: err.message || String(err) }), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

export function parseApiResponse<T extends object | string | number>(
  statusCode: number,
  data: T,
): Response {
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}
