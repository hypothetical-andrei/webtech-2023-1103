function intersperse(a, b) {
  if (a.length !== b.length) {
    return null
  }
  const result = []
  for (let i = 0; i < a.length; i++) {
    result.push(a[i])
    result.push(b[i])
  }
  return result
}

console.log(intersperse([1,2,3], ['a', 'b', 'c']))