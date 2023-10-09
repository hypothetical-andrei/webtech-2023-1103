const sampleString = 'the quick brown fox jumps over the lazy dog'

function countAppearences(s) {
  const letters = s.split('')
  const result = {}
  for (let letter of letters) {
    if  (letter in result) {
      result[letter]++
    } else {
      result[letter] = 1
    }
  }
  return result
}

console.log(countAppearences(sampleString))