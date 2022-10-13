({  // helper
    runNextWorkspaceApiMethod: function (component, index) {
        const that = this;
        const methods = component.get('v.methods');
        const operation = methods[index].operation;
        const parameters = that.parseParameters(component, methods[index].parameters);
        that.runMethod(component, operation, parameters)
            .then(() => {
                index++;
                if (index < methods.length) {
                    that.runNextWorkspaceApiMethod(component, index);
                }
            })
    },

    parseParameters: function (component, parameters) {
        const latestResponse = component.get('v.latestResponse');
        const entries = Object.entries(parameters).map(([key, value]) => {
            if (value === '<RESPONSE>') {
                return [key, latestResponse];
            }
            return [key, value]
        });
        return Object.fromEntries(entries);
    },

    runMethod: function (component, operation, parameters) {
        const workspaceAPI = component.find('workspace');
        const promise = new Promise((resolve, reject) => {
            workspaceAPI[operation](parameters)
                .then(response => {
                    component.set('v.latestResponse', response);
                    resolve(response)
                })
                .catch(error => reject(error))
        });
        return promise;
    }
})
