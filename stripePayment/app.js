'use strict';

const fs = require('fs');
const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
module.exports = api;

api.post('/initiate-payment', request => {
  const requestBody =request.body;
  
	return stripe.charges.create({
		source: requestBody.tokenId,
		amount: requestBody.amount,
		currency: requestBody.currency,
		description: 'Stripe Charge Description'
	}).then(charge => {
		return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Payment Initiated succesfully!`,
        charge,
      })
    }
	}).catch((err) => {
		return {
      statusCode: 500, 
      message: 'Payment Initialization Error', error: err };
	});
});