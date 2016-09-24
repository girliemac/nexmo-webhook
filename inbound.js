// Webhook for Nexmo SMS incoming messages

'use strict';

const express = require('express');
const app = express();
const server = app.listen(3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// Persist data storage to store data in the file system w/o DB
const storage = require('node-persist');
storage.init();

app.get('/inbound', (req, res) => {
  if (!req.query.to || !req.query.msisdn) {
    console.log('This is not a valid inbound SMS message!');
  } else {
    if (req.query.concat) {
      console.log('Fail: the message is too long.');
      /*
      {concat: 'true', 'concat-ref': '93', 'concat-total': '5', 'concat-part': '1'...}
      the message is longer than maximum number of characters allowed, and sent in multiple parts.
      Use the concat-ref, concat-total and concat-part parameters to reassemble the parts into the message.
      But I am too lazy so I am ignoring it.
      */
    } else {
      console.log('Success');
      let incomingData = {
        messageId: req.query.messageId,
        from: req.query.msisdn,
        text: req.query.text,
        timestamp: req.query['message-timestamp']
      };
      storage.setItem('id_' + req.query.messageId, incomingData);
      res.send(incomingData);
    }
  }
  res.status(200).end();
});


// To spit out JSON data for each Message ID
// e.g. http://localhost:3000/inbound/02000000F8835159
app.get('/inbound/:id', (req, res) => {
  try {
    storage.getItem('id_' + req.params.id).then((value) => {
      res.json(value);
    });
  } catch (e) {
    res.status(404).end();
  }
});
