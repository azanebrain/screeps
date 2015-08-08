/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */

module.exports = function (creep) {
    if(creep.memory.role == 'guard') {
    	var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      var myspawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
    	if(target) {
        // There is a hostile to attack
        if ( 13 >= myspawn.pos.getRangeTo(target) ) {
      		creep.moveTo(target);
      		creep.attack(target);
          console.log(creep.name + ' attacks ');
        } else if (3 >= myspawn.pos.getRangeTo(creep)) {
    	    // The guards will clump around a spawn point so move them in a random direction
    	    creep.move(Math.floor(Math.random()*8));
    	   } else {
             creep.moveTo(myspawn);
           }
           
    	} else {
        // There are no hostiles, go to the closest spawn
        creep.moveTo(myspawn);
      }
    }
}