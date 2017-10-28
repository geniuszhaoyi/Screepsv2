
exports.Role = class Role{
    
    /** @param {Creep} creep **/
    run (creep) {
        creep.say('Assign me');
    }

    /**
     * @param {String} name
    **/
    create(name) {
        Game.spawns[name].spawnCreep(this.getRecommendBody(), new Date().toISOString(), {memory: {type: this.getTag()}});
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
