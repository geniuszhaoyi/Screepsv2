var { RoleCreep } = require('model.basic.roleCreep')

exports.roleDefender = class roleDefender extends RoleCreep{

    /** @param {Creep} creep **/
    run (creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }else {
            this.idle(creep);
        }

    }

    getRecommendBody() { // 80 * 2 + 10 * 4 + 50 * 6 = 160 + 40 + 300 = 500
        return [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, ATTACK, MOVE, MOVE, ATTACK];
    }
    getTag() {
        return 'defender';
    }
}
