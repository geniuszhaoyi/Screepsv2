var { RoleCreep } = require('model.basic.roleCreep')
var { doHarvest } = require('model.basic.doHarvest')

exports.roleMiner = class roleMiner extends RoleCreep{

    /** @param {Creep} creep **/
    run (creep) {
        if(creep.memory.status == 1){
            var flag = Game.flags[creep.memory.target];
            if(!flag) {
                creep.memory.status = 0;
            }
            if(creep.pos.isEqualTo(flag.pos) == false) {
                creep.moveTo(flag.pos);
            }else {
                if(_.sum(creep.carry) == creep.carryCapacity) {
                    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: function(object) {return object.structureType == STRUCTURE_CONTAINER; }
                    });
                    if(creep.transfer(target, RESOURCE_ENERGY) != OK) {
                        creep.say('err pos');
                    }
                }else {
                    const target = creep.pos.findClosestByPath(FIND_SOURCES);
                    if(creep.harvest(target) != OK) {
                        creep.say('err pos');
                    }
                }
            }
        }else {
            for(var name in Game.flags) {
                var flag = Game.flags[name];
                if(flag.room.name == creep.room.name && flag.name.startsWith('FlagMinerpos') && !Game.creeps[flag.memory.miner]) {
                    flag.memory.miner = creep.name;
                    creep.memory.target = flag.name;
                    creep.say(creep.memory.target);
                    creep.memory.status = 1;
                    break;
                }
            }
        }
    }
    getRecommendBody() {
        return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, WORK, CARRY, CARRY, MOVE];
    }
    getTag() {
        return 'miner';
    }
}
