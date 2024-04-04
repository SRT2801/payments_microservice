require ('dotenv').config ();
const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors());


const CLIENT = process.env.CLIENT;
const SECRET = Process.env.SECRET;

const PAYPAL_API = process.env.PAYPAL_API;

const auth = { user: CLIENT, pass: SECRET}

const createPayment = (req, res) => {
   
    const body = {
        intent: "CAPTURE",
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '150'
            }
        }],
        application_context: {
            brand_name: 'Notly',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: process.env.RETURN_URL,
            cancel_url: process.env.CANCEL_URL
        }
    }

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    } , (err, response, data) =>{
        res.json({ data: response.body })
    })
}
    
app.post( '/create-payment', createPayment);


app.listen(3000, () => {
    console.log('Comencemos a generar dinero ---> http//localhost:3000');
})