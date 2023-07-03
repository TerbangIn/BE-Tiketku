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
            "gross_amount": dataId.total_price
        }

        // let item_details = [{
        //     "id": dataId.id,
        //     "price": dataId.total_price,
        //     "quantity": dataId.tiket.length,
        //     "name": "Payment for " + dataId.tiket[0].flight.airline + " - " + dataId.tiket.length + " tiket"
        // }]

        let customer_details = {
            "first_name": dataId.users.first_name,
            "email": dataId.users.email,
            "phone": dataId.users.phone_number
        }

        let midtrans_params = {
            "transaction_details": transaction_details,
            // "item_details": item_details,
            "customer_details": customer_details,
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

const midtransCallback = async (req, res) => {
    try {
        let NotificationJson = {
            'currency': req.body.currency,
            'fraud_status': req.body.fraud_status,
            'gross_amount': req.body.gross_amount,
            'order_id': req.body.order_id,
            'payment_type': req.body.payment_type,
            'status_code': req.body.status_code,
            'status_message': req.body.status_message,
            'transaction_id': req.body.transaction_id,
            'transaction_status': req.body.transaction_status,
            'transaction_time': req.body.transaction_time
        }

        await snap.transaction.notification(NotificationJson)
            .then(async (statusResponse) => {
                let orderId = statusResponse.order_id;
                let transactionStatus = statusResponse.transaction_status;
                let fraudStatus = statusResponse.fraud_status;
                const id = orderId.split("-");

                const dataId = await transaction.findByPk(id[0], {
                    include: { all: true, nested: true }
                })

                if (dataId === null) {
                    res.status(404).json({
                        status: 'failed',
                        message: `Data dengan id ${id}, tidak ditemukan`
                    })
                }

                if (transactionStatus == 'capture') {
                    // capture only applies to card transaction, which you need to check for the fraudStatus
                    if (fraudStatus == 'challenge') {
                        // TODO set transaction status on your databaase to 'challenge'
                        await transaction.update({
                            payment_status: fraudStatus,
                        }, {
                            where: {
                                id: id[0]
                            }
                        })
                        return res.redirect("https://terbang-in.netlify.app/payment-success")
                    } else if (fraudStatus == 'accept') {
                        // TODO set transaction status on your databaase to 'success'
                        await transaction.update({
                            payment_status: 'success',
                        }, {
                            where: {
                                id: id[0]
                            }
                        })
                        return res.redirect("https://terbang-in.netlify.app/payment-success")
                    }
                } else if (transactionStatus == 'settlement') {
                    // TODO set transaction status on your databaase to 'success'
                    await transaction.update({
                        payment_status: 'success',
                    }, {
                        where: {
                            id: id[0]
                        }
                    })
                    return res.redirect("https://terbang-in.netlify.app/payment-success")
                } else if (transactionStatus == 'deny') {
                    // TODO you can ignore 'deny', because most of the time it allows payment retries
                    // and later can become success
                    await transaction.update({
                        payment_status: 'deny',
                    }, {
                        where: {
                            id: id[0]
                        }
                    })
                    return res.redirect("https://terbang-in.netlify.app/payment-success")
                } else if (transactionStatus == 'cancel' ||
                    transactionStatus == 'expire') {
                    // TODO set transaction status on your databaase to 'failure'
                    await transaction.update({
                        payment_status: 'failure',
                    }, {
                        where: {
                            id: id[0]
                        }
                    })
                    return res.redirect("https://terbang-in.netlify.app/payment-success")
                } else if (transactionStatus == 'pending') {
                    // TODO set transaction status on your databaase to 'pending' / waiting payment
                    await transaction.update({
                        payment_status: 'waiting',
                    }, {
                        where: {
                            id: id[0]
                        }
                    })
                    return res.redirect("https://terbang-in.netlify.app/payment-success")
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