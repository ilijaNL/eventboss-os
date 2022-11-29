export function isAllowedDomain(origin: string) {
  const { hostname } = new URL(origin);

  const allowedHostnames = process.env.DOMAINS!.split(',');

  return allowedHostnames.some((d) => hostname.endsWith(d));
}
