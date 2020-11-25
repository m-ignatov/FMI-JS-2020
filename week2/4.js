function minElement(list, compare) {
  const orderedList = list.sort(compare);
  return orderedList[0];
}

function compare(a, b) {
  const aName = a.toString().toUpperCase();
  const bName = b.toString().toUpperCase();

  if (aName < bName) {
    return -1;
  }
  if (aName > bName) {
    return 1;
  }
  return 0;
}

const list = ["Ivan", "vanko", "ivan", "Vanko"];
console.log(minElement(list, compare));