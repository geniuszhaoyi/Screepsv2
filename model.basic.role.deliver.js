var { RoleCreep } = require('model.basic.roleCreep')
var { Target } = require('model.basic.target')

exports.roleDeliver = class roleDeliver extends RoleCreep{
    isAssigned(structure) {
        if(structure.structureType == STRUCTURE_SPAWN){
            return false;
        }
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.target == structure.id){
                return true;
            }
        }
        return false;
    }

    /** @param {Creep} creep **/
    run (creep) {
        if(creep.memory.target == undefined) {
            if(_.sum(creep.carry) == creep.carryCapacity) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: function(object) {
                        if(object.structureType == STRUCTURE_EXTENSION && object.energy < object.energyCapacity) return true;
                        if(object.structureType == STRUCTURE_SPAWN && object.energy < object.energyCapacity) return true;
                        return false;
                    }
                });
                if(targets.length == 0) {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: function(object) {
                            if(object.structureType == STRUCTURE_TOWER && object.energy < object.energyCapacity) return true;
                            return false;
                        }
                    });
                }
                for(var t of targets) {
                    if(this.isAssigned(t) == false) {
                        creep.memory.target = new Target(t.id, 'transfer');
                        break;
                    }
                }
            }else if(_.sum(creep.carry) == 0){
                creep.memory.target = new Target(creep.room.storage.id, 'withdraw_energy').dumps();
            }else {
                creep.memory.target = new Target(creep.room.storage.id, 'withdraw_energy').dumps();
            }
        }

        if(creep.memory.target != undefined) {
            var target = Target.loads(creep.memory.target);
            var ret = target.run(creep);
            if(ret == 'finished'){
                creep.memory.target = undefined;
            }
            if(ret == 'error') {
                creep.memory.target = undefined;
            }
            if(ret == 'inProcess') {
            }
        }else {
            this.idle(creep);
        }



        // if(_.sum(creep.carry) == creep.carryCapacity) {
        //     if(creep.memory.target == undefined) {
        //         var targets = creep.room.find(FIND_STRUCTURES, {
        //             filter: function(object) {
        //                 if(object.structureType == STRUCTURE_EXTENSION && object.energy < object.energyCapacity) return true;
        //                 if(object.structureType == STRUCTURE_SPAWN && object.energy < object.energyCapacity) return true;
        //                 return false;
        //             }
        //         });
        //         if(targets.length == 0) {
        //             targets = creep.room.find(FIND_STRUCTURES, {
        //                 filter: function(object) {
        //                     if(object.structureType == STRUCTURE_TOWER && object.energy < object.energyCapacity) return true;
        //                     return false;
        //                 }
        //             });
        //         }
        //         for(var t of targets) {
        //             if(this.isAssigned(t) == false) {
        //                 creep.memory.target = t.id;
        //                 break;
        //             }
        //         }
        //     }
        //     if(creep.memory.target != undefined) {
        //         var target = Game.getObjectById(creep.memory.target);
        //         var ret = creep.transfer(target, RESOURCE_ENERGY);

        //         if(ret == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(target);
        //         }else {
        //             creep.memory.target = undefined;
        //         }
        //     }else {
        //         this.idle(creep);
        //     }
        // }else {
        //     var target = creep.room.storage;
        //     creep.moveTo(target);
        //     creep.withdraw(target, RESOURCE_ENERGY);
        // }
    }
    getRecommendBody() {
        return [CARRY, MOVE];
    }
    getTag() {
        return 'deliver';
    }
}
