function IThrowStuff(o, a, n) {
  if (typeof o !== 'object') {
    throw new Error('invalid type: o should be object')
  }
  if (!Array.isArray(a)) {
    throw new Error('invalid type: a should be array')
  }
  if (!(typeof n === 'number' || n instanceof Number)) {
    throw new Error('invalid type: n should be number')
  }
  console.log('i got the right params')
}

try {
  // IThrowStuff('a')
  // IThrowStuff({}, 'a')
  // IThrowStuff({}, [], 'a')
  IThrowStuff({}, [], 5)  
} catch (error) {
  console.log(error)
} finally {
  console.log('finally here')
}