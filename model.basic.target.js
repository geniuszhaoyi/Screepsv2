
exports.Target = class Target{
    constructor(id, method) {
        this.id = id;
        this.method = method;
    }
    static loads(json) {
        var target = new Target();
        target.id = json.id;
        target.method = json.method;
        return target;
    }
    dumps() {
        return {
            id: this.id,
            method: this.method,
        }
    }
    /** @param {Creep} creep **/
    run(creep) {
        if(this.method == 'harvest') {
            var target = Game.getObjectById(this.id);
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return 'inProcess';
            }
            return 'finished';
        }
        if(this.method == 'withdraw_energy') {
            var target = Game.getObjectById(this.id);
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return 'inProcess';
            }
            return 'finished';
        }
        if(this.method == 'transfer') {
            var target = Game.getObjectById(this.id);
            creep.moveTo(target);
            for(const resourceType in creep.carry) {
                if(creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
                    return 'inProcess';
                }
            }
            return 'finished';
        }
        if(this.method == 'transfer_energy') {
            var target = Game.getObjectById(this.id);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return 'inProcess';
            }
            return 'finished';
        }
        return undefined;
    }

}
