class NumberStream {
  #seed
  #update
  #limit
  constructor(seed, update, limit) {
    this.#seed = seed
    this.#update = update
    this.#limit = limit
  }
  hasNext() {
    return this.#update(this.#seed) < this.#limit
  }
  next() {
    // if (this.#update(this.#seed) < limit) {
    this.#seed = this.#update(this.#seed)
    // }
    return this.#seed
  }
}

const s = new NumberStream(0, (n) => n + 1, 10)
while(s.hasNext()) {
  console.log(s.next())
}