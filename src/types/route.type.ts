export type RouteHandler<
  P extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >,
> = (
  req: NextRequest,
  ctx: { params: P | Promise<P>; searchParams: URLSearchParams },
) => Response | Promise<Response>;
