function pathname(el) {
  return (
    el.nodeName.toLowerCase() +
    (el.id ? "#" + el.id : "") +
    (el.className ? "." + el.className.replace(/\s+/g, ".") : "")
  );
}
export function cssPath(el) {
  var path = [];
  path.unshift(pathname(el));
  while (
    el.nodeName.toLowerCase() != "html" &&
    (el = el.parentNode) &&
    path.unshift(pathname(el))
  );
  return path.join(" > ");
}
