function reduceLeft(array, update, initialValue) {
  let accumulator = initialValue
  for (const element of array) {
    accumulator = update(accumulator, element)
  }
  return accumulator
}

console.log(reduceLeft([1, 2, 3], (a, e) => a + e, 0))