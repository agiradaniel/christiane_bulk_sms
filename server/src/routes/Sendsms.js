const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();


//Code to send custom fee sms
router.post('/sendcustom', async (req, res) => {
  try {
    
    const { studentDetails, message } = req.body;

    // Prepare the API request
    const apiEndpoint = 'https://api.mobitechtechnologies.com/sms/sendsms';
    const apiKey = process.env.MOBITECH_API_KEY

    const personalizedMessages = studentDetails.map(detail => {

      const { name, contact, balance, stuClass } = detail;

      return {
        mobile: contact,
        response_type: 'json',
        sender_name: '23107',
        service_id: 0,
        message: message.replace('[name]', name).replace('[number]', contact).replace('[balance]', balance).replace('[studentClass]', stuClass) // Replace placeholder with the number
      };
    });

    const headers = {
      'h_api_key': apiKey,
      'Content-Type': 'application/json'
    };

    // Send personalized messages to the SMS service provider
    const responsePromises = personalizedMessages.map(messageData =>
      axios.post(apiEndpoint, messageData, { headers })
    );

    const responses = await Promise.all(responsePromises);

    res.json(responses.map(response => response.data));
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'An error occurred' });
  }
});

//Code to send general bulk sms
router.post('/', async(req, res)=>{

  const {numbers, message}= req.body;
  const formattedNumbers = numbers.join(', ');
  
  try {
      const apiEndpoint = 'https://api.mobitechtechnologies.com/sms/sendbulksms';
      const apiKey = process.env.MOBITECH_API_KEY;
  
      const smsData = {
        mobile: formattedNumbers,
        response_type: 'json',
        sender_name: 23107,
        service_id: 0,
        message: message
      };
  //sender id: 23107
      const headers = {
        'h_api_key': apiKey,
        'Content-Type': 'application/json'
      };
  
      const response = await axios.post(apiEndpoint, smsData, { headers });
  
      res.json(response.data);

    } catch (error) {
      res.status(error.response.status || 500).json({ error: 'An error occurred' });
    }

})

//Code to get credit balance
router.get('/getsmsunits', async (req, res)=>{
  try {
    const apiKey = process.env.MOBITECH_API_KEY;

    const response = await axios.get('https://api.mobitechtechnologies.com/sms/units', {
        headers: {
            'h_api_key': apiKey
        }
    });

    res.json(response.data);
    
} catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching SMS balance.' });
}
})

module.exports = router;