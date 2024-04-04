const { response } = require('express');
const sender = require('../config/emailConfig');
const TicketRespository = require('../respository/ticket-repository');

const repo = new TicketRespository();

const sendBasicEmail =  (mailFrom , mailTo ,mailSubject ,mailBody) => {
     sender.sendMail({
        from : mailFrom,
        to:mailTo,
        subject:mailSubject,
        text:mailBody
    })
}

const fetchPendingEmails = async (timestamp) => {
    try {
    
    const response = await repo.get({status:"PENDING"}) ;
    return response;
        
    } catch (error) {
        console.log(error)
    }
}


const createNotifiaction = async (data) => {
    try {
        
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateTicket = async (ticketId,data) => {
    try {
        const response = await repo.update(ticketId,data);
        return response;
    } catch (error) {
        throw error;
    }
}


const subscribeEvents = async (payload) => {
    try {
        let service = payload.service;
        let data = payload.data;
        console.log('payload',payload)
        switch(service){
            case 'CREATE_TICKET':
                await createNotifiaction(data);
                break;
            case 'SEND_BASIC_MAIL':
                await sendBasicEmail(data);
                break;
            default:
                console.log('No valid event recived');
                break;

        }
        //console.log("Inside service layer", data);
    } catch (error) {
        throw error;
    }
    
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotifiaction,
    updateTicket,
    subscribeEvents
}