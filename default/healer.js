/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */

module.exports = function (creep) {
  // Heal the closest unit or move in a random direction
  var area = {
    baseRadius: 10, // How close to stay to the base
    healthRange: 20, // How damaged a unit is before it needs healing
  }
  var targets = creep.room.find(FIND_MY_CREEPS);
  //TODO: Can I set this position to memory so I don't need to run the cpu down?
  //@see http://support.screeps.com/hc/en-us/articles/203016642-Working-with-Memory for correct usage of object ids and stuff
  var myspawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
  for(var i = 0; i < targets.length; i++ ) {
    //console.log('Evaluating: ' + targets[i].hits + ' Range: ' + area.healthRange + ' Against max: ' + targets[i].hitsMax );
    if ( targets[i].hits + area.healthRange < targets[i].hitsMax ) {
      creep.moveTo(targets[i]);
      creep.heal(targets[i]);
      //console.log(creep.name + ' heals ' + targets[i].name + ' to ' + targets[i].hits);
      return;
    }
  }
  // No one needs healing. Move
  if (area.baseRadius >= myspawn.pos.getRangeTo(creep)) {
    // The guards will clump around a spawn point so move them in a random direction
    creep.move(Math.floor(Math.random()*8));
  } else {
    // Stay near the base to guard it
    creep.moveTo(myspawn);
  }
  creep.move(Math.floor(Math.random()*8));
}