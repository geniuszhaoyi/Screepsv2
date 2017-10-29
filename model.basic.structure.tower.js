var { Structure } = require('model.basic.structure');

exports.StructureTower = class StructureTower extends Structure{
    
    /** @param {Structure} structure **/
    run (structure) {
        const hostile_creeps = structure.room.find(FIND_HOSTILE_CREEPS);
        if(hostile_creeps.length) {
            structure.attack(hostile_creeps[0]);
            return ;
        }

        const damaged_creeps = structure.room.find(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(damaged_creeps.length) {
            structure.heal(damaged_creeps[0]);
            return ;
        }
        
        const damaged_structures = structure.room.find(FIND_STRUCTURES, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(damaged_structures.length) {
            structure.repair(damaged_structures[0]);
            return ;
        }
    }

}
