const cron = require('node-cron');
const { set } = require('../config/emailConfig')
const sender = require('../config/emailConfig');

const emailService = require('../service/email-service')
/**
 * 10:00am
 * Every 5 minutes
 * we will check are their any pending email which was expected to be sent 
 * by now and is pending
 */

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
          sender.sendMail({
            to:email.recepientEmaikl,
            subject:email.subject,
            text:email.content
        },async (err,data) => {
          if(err){
            console.log(error);
          }
          else{
            console.log(data);
            await emailService.updateTicket(email.id,{status:"SUCCESS"});
          }
        })
        })
        
        console.log(response);
      });
}

module.exports =setupJobs