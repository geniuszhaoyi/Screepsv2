var { ModelIndividualControl } = require('model.individualControl');

exports.ModelSpawn = class ModelSpawn extends ModelIndividualControl {

    before_run() {
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.room == undefined) {
                creep.memory.room = creep.room.name;
            }
        }
        this.ModelSpawn = JSON.parse(JSON.stringify(Memory.ModelSpawn));
    }

    run_spawn(spawn) {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.room == spawn.room.name) {

            }
        }
    }

    run_creep(creep) {
        if(creep.memory.target != undefined) {
            var operate = this.getOperate(creep, creep.memory.target);
            var target = operate.target;
            creep.moveTo(target);
            var ret = operate.op(target);
            if(ret != OK && ret != ERR_NOT_IN_RANGE) {
                creep.say('err: ' + ret);
                creep.memory.target = undefined;
            }
        }
    }

    getOperate(creep, target) {
        if(target.op == 'harvest'){
            return {
                target: Game.getObjectById(target.id),
                op: creep.harvest,
            }
        }
        if(target.op == 'withdraw'){
            return {
                target: Game.getObjectById(target.id),
                op: function(o){
                    creep.withdraw(o, target.resourcetype)
                },
            }
        }
    }

    run_structure(structure) {
    }
}
