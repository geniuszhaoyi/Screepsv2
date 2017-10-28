var { ModelIndividualControl } = require('model.individualControl');

var { Role } = require('model.basic.role')
var { roleHarvester } = require('model.basic.role.harvester')
var { roleUpgrader } = require('model.basic.role.upgrader')
var { roleBuilder } = require('model.basic.role.builder')

var roles = [
    roleHarvester,
    roleUpgrader,
    roleBuilder,
];

exports.ModelBasic = class ModelBasic extends ModelIndividualControl {
    before_run() {
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    }
    run_spawn(spawn) {
        var count = {}

        for(var Role of roles) {
            var role = new Role();
            count[role.getTag()] = 0;
        }


        // var harvester = 0;
        // var upgrader = 0;
        // var builder = 0;
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.room.name == spawn.room.name) {
                count[creep.memory.type] += 1;
                // if(creep.memory.type == 'harvester') {
                //     harvester += 1;
                // }
                // if(creep.memory.type == 'upgrader') {
                //     upgrader += 1;
                // }
                // if(creep.memory.type == 'builder') {
                //     builder += 1;
                // }
            }
        }
        for(var Role of roles) {
            if(Memory.ModelBasic[spawn.name] == undefined || Memory.ModelBasic[spawn.name][role.getTag()] == undefined) {
                console.log('ERROR (run_spawn@model.basic.js): Please update your setting (Memory.ModelBasic[' + spawn.name + '][' + role.getTag() + ']). ');
            }
            var role = new Role();
            if(count[role.getTag()] < Memory.ModelBasic[spawn.name][role.getTag()]){
                role.create(spawn.name);
            }
            // count[role.getTag()] = 0;
        }
        

        // if(harvester < Memory.ModelBasic[spawn.name].harvester){
        //     new roleHarvester().create(spawn.name);
        // }else if(upgrader < Memory.ModelBasic[spawn.name].upgrader) {
        //     new roleUpgrader().create(spawn.name);
        // }else if(builder < Memory.ModelBasic[spawn.name].builder) {
        //     new roleBuilder().create(spawn.name);
        // }

    }
    run_creep(creep) {
        var type = creep.memory.type;

        for(var Role of roles) {
            var role = new Role();
            if(type == role.getTag()) {
                role.run(creep);
            }
        }

    }
}
