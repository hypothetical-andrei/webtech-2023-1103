let sayHello = (name) => `Hello ${name}!`

// console.log(sayHello('Andrei'))

if (process.argv.length > 2) {
  console.log(sayHello(process.argv[2]))
} else {
  console.log('not enough params')
}
