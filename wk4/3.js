// f(n) = f(n - 1) + f(n - 2)
function genFib() {
  const cache = [1, 1]
  const fib = function (index) {
    if (index >= cache.length) {
      cache[index] = fib(index - 1) + fib(index - 2)
      console.log(`calculated ${cache[index]}`)
    } else {
      console.log(`got ${cache[index]} from cache`)
    }
    return cache[index]
  }
  return fib
}

const fib = genFib()
fib(5)
fib(8)