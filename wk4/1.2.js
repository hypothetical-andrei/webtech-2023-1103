class Software {
  constructor(name) {
    this.name = name
  }
  launch() {
    console.log(`${this.name} has launched`)
  }
}

const r1 = new Software('linux')
r1.launch()

class BrowserPlugin {
  constructor(name) {
    this.name = name
  }
  launch() {
    console.log(`${this.name} has launched`)
  }
}

const w1 = new BrowserPlugin('adblock')

class Browser extends Software {
  constructor(name) {
    super(name)
    this.plugins = []
  }
  installPlugin(w) {
    this.plugins.push(w)
  }
  launch() {
    console.log('loading all plugins')
    this.plugins.forEach(w => {
      w.launch()
    })
  }
}

const r2 = new Browser('chromium')
r2.installPlugin(w1)
r2.launch()