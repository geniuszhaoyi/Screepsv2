
exports.doHarvest = class doHarvest{

    /** @param {Creep} creep **/
    /** @return {int} **/
    do (creep, context) {
        if(creep.memory.target == undefined) {
            creep.memory.target = context.managerResource.requestEnergy(creep);
            creep.say(creep.memory.target);
        }

        if(creep.memory.target != undefined) {
            var target = Game.getObjectById(creep.memory.target);
            if(target) {
                if(target.structureType == STRUCTURE_CONTAINER || target.structureType == STRUCTURE_STORAGE) {
                    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                    if(_.sum(creep.carry) == creep.carryCapacity) {
                        creep.memory.target = undefined;
                        return 1;
                    }
                }
                if(target.structureType == undefined) {
                    if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                    if(_.sum(creep.carry) == creep.carryCapacity) {
                        creep.memory.target = undefined;
                        return 1;
                    }
                }
            }else {
                creep.memory.target = undefined;
            }
        }
        return 0;
    }

}
