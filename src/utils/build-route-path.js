export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  // console.log(Array.from(path.matchAll(routeParametersRegex)));

  // prettier-ignore
  const pathWithParams = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\-_]+)");

  // console.log(pathWithParams);

  const pathRegex = new RegExp(`^${pathWithParams}`);

  return pathRegex;
}
