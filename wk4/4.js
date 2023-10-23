const sampleString = 'some string'

String.prototype.initial = function() {
  return this[0].toUpperCase()
}

console.log(sampleString.initial())