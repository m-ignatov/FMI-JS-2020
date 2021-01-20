function getMax(array) {
  let max = 0;

  for (let num of array) {
    max = (max < num.toString().length) ? num.toString().length : max;
  }
  return max;
}

function getPosition(num, place) {
  return Math.floor(num / Math.pow(10, place)) % 10;
}

function radixSort(array) {
  var max = getMax(array);

  for (let i = 0; i < max; i++) {
    let buckets = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < array.length; j++) {
      const position = getPosition(array[j], i);
      buckets[position].push(array[j]);
    }
    array = [].concat(...buckets);
  }
  return array;
}

const list = [8, 7, 4, 3, 10, 2];
console.log(radixSort(list));