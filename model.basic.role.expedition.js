var { RoleCreep } = require('model.basic.roleCreep')
var { doHarvest } = require('model.basic.doHarvest')

exports.roleExpedition = class roleExpedition extends RoleCreep{

    /** @param {Creep} creep **/
    run (creep) {

        if(creep.memory.status == 1) {
            var storages = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function(object) {
                    if(object.structureType == STRUCTURE_EXTENSION && object.energy < object.energyCapacity) return true;
                    if(object.structureType == STRUCTURE_SPAWN && object.energy < object.energyCapacity) return true;
                    return false;
                }
            });
            if(storages.length) {
                if(creep.transfer(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storages[0]);
                }
                if(_.sum(creep.carry) == 0) {
                    creep.memory.status = 0;
                }
            }else {
                this.idle(creep);
            }
        }else {
            creep.memory.status = new doHarvest().do(creep, this.context);
        }

    }

    getRecommendBody() {
        return [WORK, WORK, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE];
    }
    getTag() {
        return 'expedition';
    }
}
