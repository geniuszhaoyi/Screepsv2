
exports.Job = class Job{
    constructor() {
        this.steps = [];
        this.current = 0;
    }
    loads(json) {
        this.steps = json.steps;
        this.current = json.current;
    }
    dumps() {
        return {
            steps: this.steps,
            current: this.current
        }
    }
    /** @param {Creep} creep **/
    run(creep) {
        var step = this.steps[this.current];
        this.runJson(creep, step);
    }

    runJson(creep, step) {
        if(step.method == 'harvest') {
            var target = Game.getObjectById(step.id);
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        if(step.method == 'withdraw') {
            var target = Game.getObjectById(step.id);
            if(creep.withdraw(target, step.resourceType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        if(step.method == 'transfer') {
            var target = Game.getObjectById(step.id);
            if(creep.transfer(target, step.resourceType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }

    appendJson(jsonstep) {
        this.steps.push(jsonstep);
    }
    appendHarvest(targetId) {
        this.appendJson({
            method: 'harvest',
            id: targetId,
        })
    }
    appendWithdraw(targetId, resourceType) {
        this.appendJson({
            method: 'harvest',
            id: targetId,
            resourceType: resourceType,
        })
    }
    appendTransfer(targetId, resourceType) {
        this.appendJson({
            method: 'harvest',
            id: targetId,
            resourceType: resourceType,
        })
    }
}
