var { ModelIndividualControl } = require('model.individualControl');

var { Context } = require('model.basic.context');

var { Role } = require('model.basic.role')
var { roleHarvester } = require('model.basic.role.harvester')
var { roleUpgrader } = require('model.basic.role.upgrader')
var { roleBuilder } = require('model.basic.role.builder')
var { roleDefender } = require('model.basic.role.defender')
var { roleMiner } = require('model.basic.role.miner')
var { roleTruck } = require('model.basic.role.truck')
var { roleDeliver } = require('model.basic.role.deliver')

var { StructureTower } = require('model.basic.structure.tower')

exports.ModelBasic = class ModelBasic extends ModelIndividualControl {
    constructor() {
        super();
        this.roles = [
            roleHarvester,
            roleDeliver,
            roleMiner,
            roleTruck,
            roleUpgrader,
            roleBuilder,
            roleDefender,
        ];
    }
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
        this.context = new Context();
        this.ModelBasic = JSON.parse(JSON.stringify(Memory.ModelBasic));
        for(var spawnname in this.ModelBasic) {
            var room = Game.spawns[spawnname].room;
            if(room.find(FIND_MY_CONSTRUCTION_SITES).length == 0) {
                this.ModelBasic[spawnname]['builder'] = 0;
            }
            if(room.storage) {
                this.ModelBasic[spawnname]['upgrader'] += (room.storage.store[RESOURCE_ENERGY] - 100000) / 5000;
                this.ModelBasic[spawnname]['upgrader'] -= this.ModelBasic[spawnname]['builder'];
            }
        }
    }
    run_spawn(spawn) {
        var count = {}

        for(var Role of this.roles) {
            var role = new Role();
            count[role.getTag()] = 0;
        }

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.room == spawn.room.name) {
                count[creep.memory.type] += 1;
            }
        }
        var stringcount = JSON.stringify(count);
        if(Memory.logs.count != stringcount) {
            Memory.logs.count = stringcount;
            console.log(stringcount, 'based on', JSON.stringify(this.ModelBasic));
        }

        for(var Role of this.roles) {
            if(this.ModelBasic[spawn.name] == undefined || this.ModelBasic[spawn.name][role.getTag()] == undefined) {
                console.log('ERROR (run_spawn@model.basic.js): Please update your setting (Memory.ModelBasic.' + spawn.name + '.' + role.getTag() + '). ');
            }
            var role = new Role();
            if(count[role.getTag()] < this.ModelBasic[spawn.name][role.getTag()]){
                role.create(spawn.name);
            }
        }

    }
    run_creep(creep) {
        var type = creep.memory.type;

        for(var Role of this.roles) {
            var role = new Role();
            if(type == role.getTag()) {
                role.setContext(this.context);
                role.run(creep);
            }
        }

    }

    run_structure(structure) {
        if(structure.structureType == STRUCTURE_TOWER) {
            new StructureTower().run(structure);
        }
    }
}
