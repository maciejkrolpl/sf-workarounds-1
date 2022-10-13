import { LightningElement, api, wire } from 'lwc';
import getAccountsContacts from '@salesforce/apex/AccountService.getAccountsContacts';
import {
    MessageContext,
    publish,
} from 'lightning/messageService';
import lwcWorkspaceApi from '@salesforce/messageChannel/LwcWorkspaceApi__c';

export default class WorkspaceApiUser extends LightningElement {
    @api recordId;
    @wire(getAccountsContacts, { accountId: '$recordId' }) contacts;
    @wire(MessageContext) messageContext;

    handleTabOpen(event) {
        const contactId = event.target.dataset.id;
        const operation = 'openTab';
        const parameters = {
            recordId: contactId,
            focus: true
        };
        this.sendMessage([{ operation, parameters }]);
    }

    handleSubtabOpen(event) {
        const contactId = event.target.dataset.id;
        const methods = [
            {
                operation: 'getEnclosingTabId',
                parameters: {}
            },
            {
                operation: 'openSubtab',
                parameters: {
                    recordId: contactId,
                    parentTabId: '<RESPONSE>',
                    focus: true
                }
            }
        ];
        this.sendMessage(methods);
    }

    sendMessage(methods) {
        publish(this.messageContext, lwcWorkspaceApi, { methods });
    }


}