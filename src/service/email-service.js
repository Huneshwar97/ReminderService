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

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotifiaction,
    updateTicket
}