export default function sliceName(name, maxLength) {
  if (name.length > maxLength) {
    return `${name.slice(0, name.length)}...`;
  }
  return name;
}
