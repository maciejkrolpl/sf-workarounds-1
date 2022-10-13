public with sharing class AccountService {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAccountsContacts(Id accountId){
        return [
            SELECT Id, Name FROM Contact WHERE AccountId = :accountId
        ];
    }
}
