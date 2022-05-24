import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import relatedBooks from '@salesforce/apex/readerController.relatedBooks';
import getData from '@salesforce/apex/readerController.getData';

/*const columns = [
    { label: 'Date', fieldName: 'StartDate__c', type: 'date' }
];*/

const columns = [
    { label: 'Website', fieldName: 'StartDate__c', type: 'date' }
];

export default class BasicDatatable extends LightningElement {
    @api recordId;
    data;
    columns = columns;

    @wire (relatedBooks, {accountName: '$recordId'}) data;
    //@wire (getData, {accountName: '$recordId'}) info;


    showToast() {
        console.log(this.data);

        const event = new ShowToastEvent({
            message:
                'Refresh integration is not yet configured',
        });
        this.dispatchEvent(event);
        
    }
}