var { Job } = require('model.basic.job');

exports.ManagerJob = class ManagerJob{
    
    constructor() {
        this.jobsTruck = {}
        for(var name in Game.spawns){
            this.generateJobsForTruck(Game.spawns[name]);            
        }
    }

    /** @param {Creep} creep **/
    requestJob(creep) {
        if(creep.memory.type == 'truck') {
            return this.requestJobForTruck(creep);
        }
    }

    generateJobsForTruck(spawn) {
        this.jobsTruck[spawn.room.name] = [];
        var storages = spawn.room.find(FIND_MY_STRUCTURES, {
            filter: function(object) {
                if(object.structureType == STRUCTURE_EXTENSION && object.energy < object.energyCapacity) return true;
                if(object.structureType == STRUCTURE_SPAWN && object.energy < object.energyCapacity) return true;
                if(object.structureType == STRUCTURE_TOWER && object.energy < object.energyCapacity * 0.50) return true;
                return false;
            }
        });
        for(var i in storages) {
            var job = new Job();
            job.appendWithdraw(spawn.room.storage.id, RESOURCE_ENERGY);
            job.appendTransfer(storages[i].id, RESOURCE_ENERGY);
            this.jobsTruck[spawn.room.name].push(job);
            // console.log(JSON.stringify(job.dumps()));
        }
    }
    /** @param {Creep} creep **/
    requestJobForTruck(creep) {

    }

}
