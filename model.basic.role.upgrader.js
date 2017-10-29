var { RoleCreep } = require('model.basic.roleCreep')
var { doHarvest } = require('model.basic.doHarvest')

exports.roleUpgrader = class roleUpgrader extends RoleCreep{

    /** @param {Creep} creep **/
    run (creep) {
        if(creep.memory.status == 1) {
            creep.moveTo(creep.room.controller);
            creep.upgradeController(creep.room.controller);
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
        return 'upgrader';
    }
}
