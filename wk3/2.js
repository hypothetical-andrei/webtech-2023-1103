const sampleYoB = [1999, 2001, 2002, 2019, 2007]

const results = sampleYoB.map(e => 2023 - e).filter(e => e >= 18)

console.log(results)