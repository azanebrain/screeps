/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */

module.exports = function (creep) {
  // Area values for actions
  var area = {
    attackRange: 15, // How far to go to attack
    baseRadius: 8, // How close to stay to the base
  }
  if(creep.memory.role == 'guard') {
  	var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    var myspawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
  	if(target) {
      var targetRange = myspawn.pos.getRangeTo(target); // Distance enemy is from the base
      // There is a hostile to attack
      if ( area.attackRange >= targetRange ) {
    		creep.moveTo(target);
    		creep.attack(target);
        if ( area.attackRange === targetRange ) {
          console.log(creep.name + ' attacks ');
        }
      } else if (area.baseRadius >= myspawn.pos.getRangeTo(creep)) {
  	    // The guards will clump around a spawn point so move them in a random direction
  	    creep.move(Math.floor(Math.random()*8));
  	  } else {
        // Stay near the base to guard it
        creep.moveTo(myspawn);
      }
  	} else {
      // There are no hostiles, go to the closest spawn
      creep.moveTo(myspawn);
    }
  }
}