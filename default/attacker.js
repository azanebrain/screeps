/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('attacker'); // -> 'a thing'
 */

module.exports = function (creep) {
    // TODO: 
    // Hang out by the base until there is an armada
    // Whoever is the strongs (has the most attack body parts?) is the armadaLeader role
    // There can only be one armada leader. First count('armadaLeader')
    // The armadaLeader choose the closest enemy to attack
    // The rest of the armada attacks the enemy closest to the armadaLeader

    if(creep.memory.role == 'attacker') {
    	var targets = creep.room.find(FIND_HOSTILE_CREEPS);
    	if(targets.length) {
    		creep.moveTo(targets[0]);
    		creep.attack(targets[0]);
    	}
    }
}