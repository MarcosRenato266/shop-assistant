export function removeDuplicates(array, key) {
  let lookup = new Set();
  return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
}
