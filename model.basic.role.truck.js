var { RoleCreep } = require('model.basic.roleCreep')
var { doHarvest } = require('model.basic.doHarvest')

exports.roleTruck = class roleTruck extends RoleCreep{

    /** @param {Creep} creep **/
    run (creep) {
        if(_.sum(creep.carry) < creep.carryCapacity) {
            const dropped_resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(dropped_resource && (dropped_resource.amount > 50 || dropped_resource.resourceType != RESOURCE_ENERGY)) {
                let path = creep.pos.findPathTo(dropped_resource);
                if(path.length <= 5000) {
                    creep.moveTo(dropped_resource);
                    creep.pickup(dropped_resource);
                    return ;
                }
            }
        }
        
        if(creep.carry[RESOURCE_ENERGY] == 0) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: function(object) {
                    if(object.structureType == STRUCTURE_CONTAINER && object.store[RESOURCE_ENERGY] > 0) return true;
                    return false;
                }
            });
            var max = 0;
            var target = undefined;
            for(var t of targets) {
                if(max < t.store[RESOURCE_ENERGY]){
                    max = t.store[RESOURCE_ENERGY];
                    target = t;
                }
            }
            if(!target) {
                this.idle(creep);
            }
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }else {
            var target = creep.room.storage;
            creep.moveTo(target);
            for(const resourceType in creep.carry) {
                creep.transfer(target, resourceType);
            }
        }
    }
    getRecommendBody() {
        return [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE];
    }
    getTag() {
        return 'truck';
    }
}
