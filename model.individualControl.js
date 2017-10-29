var { Model } = require('model');

exports.ModelIndividualControl = class ModelIndividualControl extends Model{
    
    before_run() {}

    run () {
        this.before_run();

        for(var name in Game.spawns) {
            var spawn = Game.spawns[name];
            this.run_spawn(spawn);
        }
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            this.run_creep(creep);
        }

        for(var id in Game.structures) {
            var structure = Game.structures[id];
            this.run_structure(structure);
        }

        this.after_run();
    }

    after_run() {}

    run_spawn(spawn) {
        console.log('Error (run_spawn@model.individualControl.js): You should implement this method');
    }
    run_creep(creep) {
        console.log('Error (run_creep@model.individualControl.js): You should implement this method');
    }
    run_structure(structure) {
        console.log('Error (run_structure@model.individualControl.js): You should implement this method');
    }
    
}
