var { doHarvest } = require('model.basic.doHarvest')

exports.Role = class Role{

    setContext(context) {
        // console.log(context.x);
        this.context = context;
    }

    /** @param {Creep} creep **/
    run (creep) {
        creep.say('Assign me');
    }

    /** @param {Creep} creep **/
    idle(creep) {
        if(creep.hits < creep.hitsMax) {
            var spawns = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_SPAWN }
            });
            if(Game.spawns[spawns[0].name].recycleCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawns[0]);
            }
        }else {
            var flag = Game.flags['FlagIdle'];
            if(flag) {
                creep.moveTo(flag);
            }
        }
    }

    /**
     * @param {String} name spawn name
    **/
    create(name) {
        Game.spawns[name].spawnCreep(this.getRecommendBody(), new Date().toISOString(), {
            memory: {
                type: this.getTag(),
                room: Game.spawns[name].room.name,
            }
        });
    }
    getRecommendBody() {
        console.log('Error (getRecommendBody@model.basic.role.js): You should implement this method');        
        return [WORK, CARRY, MOVE];
    }
    getTag() {
        console.log('Error (getTag@model.basic.role.js): You should implement this method');        
        return 'role';
    }
}
