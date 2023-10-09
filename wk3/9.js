const dictionary = ['white', 'brown', 'black', 'red']

const sample = `
  best
  read
  on
  windy
  nights
`

function checkAcrostic(s, d) {
  const target = s.split('\n').filter(e => e).map(e => e.trim()).map(e => e[0]).join('')
  return d.indexOf(target) !== -1
}

console.log(checkAcrostic(sample, dictionary))