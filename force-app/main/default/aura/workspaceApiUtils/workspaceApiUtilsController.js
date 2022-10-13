({  // controller
    handleMessageReceived: function (component, message, helper) {
        const methods = message.getParam('methods');
        component.set('v.methods', methods);
        const index = 0;
        helper.runNextWorkspaceApiMethod(component, index);
    }
})
