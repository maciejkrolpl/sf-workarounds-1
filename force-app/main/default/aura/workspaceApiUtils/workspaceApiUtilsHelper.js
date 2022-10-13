({  // helper
    runMethod: function (component) {
        const workspaceAPI = component.find('workspace');
        const { operation, parameters } = component.get('v.method')
        workspaceAPI[operation](parameters)
            .then(response => console.log(response))
            .catch(error => console.error(error))
    }
})
