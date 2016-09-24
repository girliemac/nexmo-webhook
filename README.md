#Nexmo Inbound Message Webhook Example

This is an example of webhook, where you can route all incoming SMS message data that sent to your Nexmo phone number.

To test this webhook on [localhost](http://localhost:3000), I am using [ngrok](https://ngrok.com/), which allows you to test your webhook locally without deploying.

## Setting Up The Webhook URL

To set up a global callback URL:

1. Go to your dashboard at [API Setting](https://dashboard.nexmo.com/settings).
2. At **Callback URL for Inbound Message**, enter your webhook URL (ngrok url should look like *http://033b613c.ngrok.io/inbound* with /inbound route).

You can also set up a webhook for each phone number you have.

To set up an individual callback:

1. Go to your dashboard at [Your numbers](https://dashboard.nexmo.com/your-numbers).
2. Scroll the table horizontally to **Manage** and click **Edit** of the number you want to add a webhook. A dialog box will open.
3. In the dialog box, enter your webhook URL at SMS **Callback URL**. Press **Update**.

## Running this Webhook locally

Install all dependencies:

```bash
$ npm install
```
Run:

```bash
$ node inbound.js
```
Try sending text messages from your mobile phone to your Nexmo virtual number.

If you are using ngrok, you can inspect all requests at http://127.0.0.1:4040/ on browser.
