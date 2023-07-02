require('dotenv').config()

const { transaction } = require('../models')
const { v4: uuidv4 } = require('uuid');
const midtransClient = require('midtrans-client');
const Joi = require('joi');

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVERKEY,
    clientKey: process.env.CLIENTKEY
})

const getSnapRedirect = async (req, res) => {
    try {
        const id = req.params.id

        const dataId = await transaction.findByPk(id, {
            include: { all: true, nested: true }
        })

        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        let midtrans_booking = dataId.id + '-' + (Math.random() + 1).toString(36).substring(7)
        let orderId = midtrans_booking

        let transaction_details = {
            "order_id": orderId,
            "gross_amount": 10000
        }

        let item_details = [{
            "id": orderId,
            "price": 10000,
            "quantity": dataId.tiket.length,
            "name": "Payment for " + dataId.tiket[0].flight.airline + " - " + dataId.tiket.length + " tiket"
        }]

        let customer_details = {
            "first_name": dataId.users.first_name,
            "email": dataId.users.email,
            "phone": dataId.users.phone_number
        }

        let midtrans_params = {
            "transaction_details": transaction_details,
            "customer_details": customer_details,
            "item_details": item_details,
            "enabled_payments": ['gopay', 'shopeepay']
        }


        await snap.createTransaction(midtrans_params)
            .then(async (transaction_response) => {
                // transaction redirect_url
                let redirectUrl = transaction_response.redirect_url;
                await transaction.update({
                    midtrans_url: redirectUrl,
                    midtrans_booking_code: midtrans_booking,
                }, {
                    where: {
                        id
                    }
                })
                res.status(201).json({
                    status: `Transaction Telah Dibuat Silahkan Anda Melakukan Pembayaraan`,
                    link: redirectUrl
                })
            })

    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

const midtransCallback = async (req,res) => {
    try{
        await snap.transaction.notification(notificationJson)
        .then(async (statusResponse)=>{
            let orderId = statusResponse.order_id;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;
            const id = orderId.split("-");

            // console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);
            const dataId = await transaction.findOne({where:{
                id: id[0]
            }},{
                include: { all: true, nested: true }
            })
    
            let status = ''
    
                if (transactionStatus == 'capture'){
                    if (fraudStatus == 'challenge'){
                        // TODO set transaction status on your databaase to 'challenge'
                        status = 'pending'
                        await transaction.update({
                            payment_status: status,
                        }, {
                            where: {
                                id: id[0]
                            }
                        })
                        return res.status(201).json({
                            status: 'success',
                            dataId
                        })

                } else if (transactionStatus == 'cancel' ||
                    transactionStatus == 'deny' ||
                    transactionStatus == 'expire') {
                    // TODO set transaction status on your databaase to 'failure'
                    status = 'failed'
                    await transaction.update({
                        payment_status: status,
                    }, {
                        where: {
                            id: id[0]
                        }
                    })
                    return res.status(201).json({
                        status: 'success',
                        dataId
                    })
                } else if (transactionStatus == 'pending') {
                    // TODO set transaction status on your databaase to 'pending' / waiting payment
                    status = 'pending'
                    await transaction.update({
                        payment_status: status,
                    }, {
                        where: {
                            id: id[0]
                        }
                    })
                    return res.status(201).json({
                        status: 'success',
                        dataId
                    })
                }

            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}

const postTransaction = async (req, res) => {
    const schema = Joi.object({
        user_id: Joi.number().integer().required().label("ID user"),
        payment_id: Joi.number().integer().label("ID payment"),
        payment_status: Joi.string().label("Status Payment"),
        total_price: Joi.number().required().label("Total Price"),
        midtrans_url: Joi.string(),
        midtrans_booking_code: Joi.string()
    })

    const val = schema.validate(req.body)

    if (!(val.error)) {
        try {
            const datas = val.value
            const data = await transaction.create({
                status: "Unpaid",
                ...datas,
                kode_booking: Math.random().toString(36).toUpperCase().slice(2, 14),
            })

            res.status(201).json({
                status: 'Success',
                data
            })
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message
            })
        }
    } else {
        const message = val.error.details[0].message
        res.status(400).json({
            status: "failed",
            message
        })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id

        const dataId = await transaction.findByPk(id)

        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        await transaction.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            status: 'success',
            message: `Data dengan index ${id} telah berhasil terhapus`
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}


const getTransaction = async (req, res) => {
    try {
        let data = await transaction.findAll({
            include: { all: true, nested: true }
        })
        return res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        return res.status(400).json({
            status: 'failed',
            message: err.message,
        })
    }
}

const updateTransaction = async (req, res) => {
    try {
        const datas = req.body
        const id = req.params.id

        const dataId = await transaction.findByPk(id)

        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        await transaction.update({
            ...datas
        }, {
            where: {
                id
            }
        })
        res.status(200).json({
            status: 'success',
            message: `Data dengan index ${dataId} telah berhasil terupdate`
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}


const getIdTransaction = async (req, res) => {
    try {
        const id = req.params.id
        const dataId = await transaction.findByPk(id, {
            include: { all: true, nested: true }
        })

        if (!dataId) {
            return res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        } else {
            return res.status(201).json({
                status: 'success',
                dataId
            })
        }

    } catch (err) {
        return res.status(400).json({
            status: 'failed',
            message: err.message,
        })
    }
}

module.exports = {
    postTransaction,
    getTransaction,
    getIdTransaction,
    deleteTransaction,
    updateTransaction,
    getSnapRedirect,
    midtransCallback
}