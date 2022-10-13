({
    handleMessageReceived: function (component, message, helper) {
        const methods = message.getParams();
        component.set('v.methods', methods);
        helper.runNextWorkspaceApiMethod(component, 0);
    }
})
