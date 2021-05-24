const express  = require('express');
const config = require('./config');

const telnyx = require('telnyx')(config.TELNYX_API_KEY);
const router = module.exports = express.Router();

// inbound message handling
const inboundMessageController = async (req, res) => {
    res.sendStatus(200); // Play nice and respond to webhook
    const event = req.body.data;
    // log contents of SMS text and respond
    console.log(`event.payload.text`, event.payload.text)
    let smsText = event.payload.text
    smsText = smsText.trim().toLowerCase()
    
    console.log(`Received inbound message with ID: ${event.payload.id}`)
    const dlrUrl = (new URL('/messaging/outbound', `${req.protocol}://${req.hostname}`)).href;
    const toNumber = event.payload.to[0].phone_number;
    const fromNumber = event.payload['from'].phone_number;
    
    let smsResponse
    switch (smsText) {
        case "pizza":
            smsResponse = "Chicago pizza is the best"
            break;
    
        case "ice cream":
            smsResponse = "I prefer gelato";
            break;

        default:
            smsResponse = "Please send either the word ‘pizza’ or ‘ice cream’ for a different response";
            break;
    }

    let messageRequest = {
        from: toNumber,
        to: fromNumber,
        text: smsResponse,
        media_urls: undefined,
        webhook_url: dlrUrl,
        use_profile_webhooks: false
      }
    try {
      const telnyxResponse = await telnyx.messages.create(messageRequest);
      console.log(`Sent message with id: ${telnyxResponse.data.id}`);
    }
    catch (e)  {
      console.log('Error sending message');
      console.log(e);
    }
  
  };

//   outbound message handling
const outboundMessageController = async (req, res) => {
    res.sendStatus(200); // Play nice and respond to webhook
    const event = req.body.data;
    console.log(`Received message DLR with ID: ${event.payload.id}`)
  };

// inbound/outbound routing
router.route('/inbound')
    .post(inboundMessageController);

router.route('/outbound')
    .post(outboundMessageController);