const sampleArray = [1, 3, 4, 5, 2]

const totalArea = sampleArray.map(e => e * e).reduce((a, e) => a + e, 0)

console.log(totalArea)