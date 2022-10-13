({  // controller
    handleMessageReceived: function (component, message, helper) {
        const method = message.getParam('method');
        component.set('v.method', method);
        helper.runMethod(component);
    }
})
