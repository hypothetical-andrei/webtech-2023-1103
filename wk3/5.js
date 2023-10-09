function formatString(s, ...params) {
  let modified = s
  for (let i = 0; i < params.length; i++) {
    modified = modified.replace('{' + i + '}', params[i])
  }
  return modified
}

console.log(formatString("{0} has a {1} {2}", 'Mary', 'little', 'lamb'
))