var { RoleCreep } = require('model.basic.roleCreep')
var { doHarvest } = require('model.basic.doHarvest')

exports.roleBuilder = class roleBuilder extends RoleCreep{

    /** @param {Creep} creep **/
    run (creep) {
        if(creep.memory.status == 1){
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                creep.moveTo(targets[0]);
                creep.build(targets[0]);
            }else {
                this.idle(creep);
            }
            if(_.sum(creep.carry) == 0) {
                creep.memory.status = 0;
            }
        }else {
            creep.memory.status = new doHarvest().do(creep, this.context);
        }
    }
    getRecommendBody() {
        return [WORK, CARRY, MOVE, CARRY, MOVE];
    }
    getTag() {
        return 'builder';
    }
}
