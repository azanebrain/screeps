/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * @param array [array] : The array of creeps
 * @param role [string] : The role of the creep to count
 * You can import it from another modules like this:
 * var roles = require(array, 'role'); // -> 'a thing'
 */
module.exports = function (role) {
    var array = [];
    for(var i in Game.creeps) {
        // console.log('Is this creep: ' + Game.creeps[i] +' a role: ' + role);
        if(Game.creeps[i].memory.role == role) {
          array.push(Game.creeps[i]);
        }
    }
    return array;
}