var { ManagerResource } = require('model.basic.manager.resource')
var { ManagerJob } = require('model.basic.manager.job')

exports.Context = class Context{
    constructor() {
        this.managerResource = new ManagerResource();
        this.managerJob = new ManagerJob();
    }
}
