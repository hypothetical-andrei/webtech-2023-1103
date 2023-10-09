const sampleStrings = ['cat', 'dog', 'donkey', 'giraffe', 'elephant']

let result = sampleStrings.map(e => e.length)
// let result = sampleStrings.map((element, index, array) => element.length)


console.log(result)

function getLongerThan(a, n) {
  // const results = []
  // for (const element of a) {
  //   if (element.length > n) {
  //     results.push(element)
  //   }
  // }
  // return results
  return a.filter(e => e.length > n)
}

console.log(getLongerThan(sampleStrings, 3))