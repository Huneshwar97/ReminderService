const TicketService =  require('../service/email-service');

const create = async (req,res) => {
    try {
        const response = await TicketService.createNotifiaction(req.body);
        return res.status(201).json({
            success:true,
            data:response,
            err:{},
            message:'Successsfully registered an emaol reminder'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            data:{},
            err:error,
            message:'unable to register an email reminder'
        })
    }
}

module.exports={
    create
}