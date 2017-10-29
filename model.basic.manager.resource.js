
exports.ManagerResource = class ManagerResource{
    
    /** @param {Creep} creep **/
    requestEnergy(creep) {
        var targets;

        var work = 0;
        for(var body of creep.body) {
            if(body.type == 'work') {
                work +=1 ;
            }
        }
        
        targets = creep.room.find(FIND_STRUCTURES, {
            filter: function(object) {
                if(object.structureType == STRUCTURE_CONTAINER && object.store[RESOURCE_ENERGY] > 800) return true; 
                if(object.structureType == STRUCTURE_STORAGE && object.store[RESOURCE_ENERGY] > 100000) return true; 
                return false;
            }
        });
        if(targets.length) {
            var rand = Math.floor((Math.random() * targets.length));
            return targets[rand].id;
        }

        if(work > 0) {
            targets = creep.room.find(FIND_SOURCES);
            if(targets.length) {
                var rand = Math.floor((Math.random() * targets.length));
                return targets[rand].id;
            }
        }
    
        console.log("EMERGENCY (requestEnergy@model.basic.mamager.resource.js): No energy resource available! ");
    }

}
