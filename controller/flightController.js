const { flight } = require('../models')

const getData = async (req,res) => {
    try{
        data = await flight.findAll({
            include: ["information"]
        })
        console.log(data)
        if(data){
            return res.status(200).json({
                status: "success",
                data : data
            })
        }else{
            return res.status(200).json({
                status: "success",
                data : "tidak ada"
            })
        }
        
    }catch{

    }
}

module.exports = {
    getData
}