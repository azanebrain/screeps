var harvester = require('harvester'),
  count = require('count'),
  guard = require('guard'),
  healer = require('healer'),
  randomname = require('randomname'),

  harvesters = count('harvester'),
  guards = count('guard'),
  healers = count('healer'),

// Number of guards to have
  population = {
    guard: {
      basic: 8,
    },
    healer: {
      basic: 3,
    }
  },
// Cost for different unit types
  cost = {
    guard: 150,
    guardLv2: 230,
    harvester: 200,
    healer: 250,
    rangedGuard: 220
  },
// Body sets
  body = {
    guard: [TOUGH,TOUGH,ATTACK,MOVE],
    guardLv2: [TOUGH,TOUGH,ATTACK,ATTACK,MOVE],
    harvester: [WORK,CARRY,MOVE],
    healer: [HEAL,MOVE],
    rangedGuard: [TOUGH,TOUGH,RANGED_ATTACK,MOVE]
  };

// console.log('cpu limit ' + Game.cpuLimit + ' | getUsedCpu: ' + Game.getUsedCpu() );
for(var name in Game.spawns) {
    var spawn = Game.spawns[name];
    if(null === spawn.spawning) {
        // TODO: Set a harvesterLimit global and harvestersCreated property
        if(harvesters.length < 3 && spawn.energy >= cost.harvester ) {
            // Basic harvester to get resources
            console.log('Not enough harvesters. Creating new Harvester of ' + harvesters.length);
            spawn.createCreep(body.harvester,'Harvester' + randomname(),{role:'harvester'});
        } else if(spawn.energy >= 150) {
          if ( guards.length < 3  && spawn.energy >= cost.guard ) {
            // Basic Guard to get basic defense
            console.log('Not enough guards. Creating new Guard of ' + guards.length);
            spawn.createCreep(body.guard,'Guard' + randomname(),{role:'guard'});
          } else if ( spawn.energy >= cost.rangedGuard && guards.length % 3 === 0 && population.guard.basic > guards.length) {
            // Ranged Guard
            console.log('Creating new RangedGuard of ' + guards.length);
            spawn.createCreep(body.rangedGuard,'RangedGuard' + randomname(),{role:'guard'});
          } else if ( spawn.energy >= cost.guard && population.guard.basic > guards.length) {
            // Basic Guard to fill up the ranks
            console.log('Filling up ranks. Creating new Guard of ' + guards.length);
            spawn.createCreep(body.guard,'Guard' + randomname(),{role:'guard'});
          } else if ( spawn.energy >= cost.healer && population.healer.basic > healers.length) {
            // Healer to heal the guard force
            console.log('Creating new Healer of ' + healers.length);
            spawn.createCreep(body.healer,'Healer' + randomname(),{role:'healer'});
          } else if ( spawn.energy >= cost.guardLv2 && 1 <= healers.length ) {
            // Lv2 Guard
            console.log('Creating new GuardLevel2 of ' + guards.length);
            spawn.createCreep(body.guardLv2,'GuardLv2' + randomname(),{role:'guard'});
          // } else if () {
            // Ranged attack and melee attack happen at different 
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

  if (creep.memory.role == 'builder') {
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
	} else if (creep.memory.role == 'harvester') {
		harvester(creep);
	} else  if (creep.memory.role == 'healer') {
    healer(creep);
	} else if (creep.memory.role == 'guard') {
		guard(creep);
	}
}