function pathname(el) {
  if (el.id) {
    return "#" + el.id;
  }
  let str = el.nodeName.toLowerCase();
  if (el.className) {
    const className = el.className
      .split(" ")
      .sort()
      .join(".");
    return str + "." + className;
  }
  return str;
}
export function cssPath(el) {
  var path = [];
  while (el.parentNode) {
    path.unshift(pathname(el));
    if (el.id) {
      break;
    }
    el = el.parentNode;
  }
  return path.join(" > ");
}
