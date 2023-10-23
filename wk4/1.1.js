function Robot(name) {
  this.name = name
}

Robot.prototype.move = function () {
  console.log(`${this.name} is moving`)
}

const r1 = new Robot('somerobot')
r1.move()

function CombatRobot(name) {
  Robot.call(this, name)
}

CombatRobot.prototype = Object.create(Robot)