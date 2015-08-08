var harvester = require('harvester');
var guard = require('guard');
var count = require('count'); 

var harvesters = count('harvester');
var guards = count('guard');
var healers = count('healer');

// Number of guards to have
var guardnum = {
  basic: 8
}

for(var name in Game.spawns) {
    var spawn = Game.spawns[name];
    if(null === spawn.spawning) {
        // TODO: Set a harvesterLimit global and harvestersCreated property
        if(spawn.energy >= 200) {
          if ( harvesters.length < 3 ) {
            // Basic harvester to get resources
            console.log('Creating Harvester' + harvesters.length);
            spawn.createCreep([WORK,CARRY,MOVE],'Harvester' + harvesters.length,{role:'harvester'});
          } else if ( guards.length < 3 ) {
            // Basic Guard to get basic defense
            console.log('Creating Guard' + guards.length);
            spawn.createCreep([TOUGH,TOUGH,ATTACK,MOVE],'Guard' + guards.length,{role:'guard'});
          } else if ( spawn.energy >= 220 && guards.length % 3 === 0 && guardnum.basic > guards.length) {
            // Ranged Guard
            console.log('Creating RangedGuard' + guards.length);
            spawn.createCreep([TOUGH,TOUGH,RANGED_ATTACK,MOVE],'RangedGuard' + guards.length,{role:'guard'});
          } else if ( guardnum.basic > guards.length) {
            // Basic Guard to fill up the ranks
            console.log('Creating Guard' + guards.length);
            spawn.createCreep([TOUGH,TOUGH,ATTACK,MOVE],'Guard' + guards.length,{role:'guard'});
          } else if ( spawn.energy >= 250 ) {
            // Healer to heal the guard force
            console.log('Creating Healer' + healers.length);
            spawn.createCreep([HEAL,MOVE],'Healer' + healers.length,{role:'healer'});
          } else if ( spawn.energy >= 230 && 1 <= healers.length ) {
            // Lv2 Guard
            console.log('Creating Level2Guard' + guards.length);
            spawn.createCreep([TOUGH,TOUGH,ATTACK,ATTACK,MOVE],'Level2Guard' + guards.length,{role:'guard'});
          } else {
            // save some energy
          }
        } else {
          //console.log('not creating');
        }
    }
}

for(var name in Game.creeps) {
	var creep = Game.creeps[name];

	if (creep.memory.role == 'harvester') {
		harvester(creep);
	} else if (creep.memory.role == 'guard') {
		guard(creep);
	} else if (creep.memory.role == 'builder') {
		if(creep.carry.energy == 0) {
			creep.moveTo(Game.spawns.Spawn1);
			Game.spawns.Spawn1.transferEnergy(creep);
		}
		else {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if(targets.length) {
				creep.moveTo(targets[0]);
				creep.build(targets[0]);
			}
		}
	} else if (creep.memory.role == 'healer') {
    // Heal the closest unit or move in a random direction
    var targets = creep.room.find(FIND_MY_CREEPS);
    if ( targets[0].hits === targets[0].hitsMax ) {
      creep.move(Math.floor(Math.random()*8));
    } else {
      creep.moveTo(targets[0]);
      creep.heal(targets[0]);
      console.log(creep.name + ' heals ' + targets[0].name);
    }
	}
}