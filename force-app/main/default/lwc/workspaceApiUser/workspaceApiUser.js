import { LightningElement, api, wire } from 'lwc';
import getAccountsContacts from '@salesforce/apex/AccountService.getAccountsContacts';
import { MessageContext, publish } from 'lightning/messageService';
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
        this.sendMessage({ operation, parameters });
    }

    handleSubtabOpen(event) {
        const contactId = event.target.dataset.id;
    }

    sendMessage(method) {
        publish(this.messageContext, lwcWorkspaceApi, { method } );
    }
}