Number.prototype.times = function (f) {
  for (let i = 0; i < this; i++) {
    f()
  }
}

const n = new Number(5)

n.times(() => {
  console.log('called')
})