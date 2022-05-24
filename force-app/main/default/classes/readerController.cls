public with sharing class readerController {
    @AuraEnabled(cacheable=true)
    public static List<Subscription__c> relatedBooks(String accountName) {
        return [SELECT id, StartDate__c FROM Subscription__c];
    }

    @AuraEnabled(cacheable=true)
    public static void getData(String accountName) {
        Httprequest req = new Httprequest();
        req.setMethod('GET');
        
        req.setEndpoint('https://avenga-school.herokuapp.com/retrieve-record');
        req.setHeader('objectName', 'Reader');
        req.setHeader('recordId', accountName);
        Http http = new Http();
                
        try {
            HTTPResponse res = http.send(req);
            Reader__c r = (Reader__c) JSON.deserialize(res.getBody(), Reader__c.class);
            r.Last_Sync_Date__c = System.now();
            r.ID = accountName;
            update r;
        }
        catch (System.CalloutException e){}
    }
}