({
    handleMessageReceived: function (component, message, helper) {
        const methods = message.getParam('methods');
        component.set('v.methods', methods);
        helper.runNextWorkspaceApiMethod(component, 0);
    }
})
