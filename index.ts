Deno.serve(async (request): Promise<Response> => {
  return new Response("Hello, world!");
});
