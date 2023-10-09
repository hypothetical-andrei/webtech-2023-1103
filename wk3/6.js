function formatString(s, params) {
  let modified = s
  for (const prop in params) {
    modified = modified.replace(`{${prop}}`, params[prop])
  }
  return modified
}

console.log(formatString("{name} has a {attribute} {pet}", { name: 'Mary', attribute: 'little', pet: 'lamb' }))