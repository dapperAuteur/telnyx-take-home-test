<div align="center">

# Anthony's Telnyx-Node SMS Take Home Test
</div>
This is an SMS Auto-Responder application. It'll respond with one of three text messages.

I followed the [Telnyx MMS Tutorial](https://developers.telnyx.com/docs/v2/messaging/tutorials/mms-tutorials?lang=node) to build this.

The Telnyx MMS Tutorial [repo](https://github.com/team-telnyx/demo-node-telnyx/tree/master/express-messaging) has VERY similar code. I should've forked it. LOL. I removed the AWS code. I removed the functions for downloading and uploading images too. That's the main difference between this project and the tutorial. I copied the tutorial [README.md](https://github.com/team-telnyx/demo-node-telnyx/tree/master/express-messaging#readme) as well. I did read through it multiple times to ensure there weren't any typos or errors not relevent for this project. There weren't any typos and I've made changes to the `README.md` where the projects differ. I asked a non-tech person to read it to ensure the instructions may be followed.

I chose to alter the existing `README.md` instead of writing a new one because I've learned in tech that it's best to build on the work of smarter humans.

By the way, it works on my machine.

Enjoy.

## Pre-Reqs

This is what you will need to set it up:

* [Telnyx Account](https://telnyx.com/sign-up?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link)
* [Telnyx Phone Number](https://portal.telnyx.com/#/app/numbers/my-numbers?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link) enabled with:
  * Ability to receive webhooks (with [ngrok](https://developers.telnyx.com/docs/v2/development/ngrok?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link) or similar tool)
  * This project assumes you're using ngrok. The instructions to set it up for ngrok are [here](https://developers.telnyx.com/docs/v2/development/ngrok?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link))
* [Node & NPM](https://developers.telnyx.com/docs/v2/development/dev-env-setup?lang=node&utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link) installed

## What you can do with this api?

* Send an SMS and receive a response back to your phone number.
  * The response is based on the content of the text message sent.
  * It expects the text of the message to be `pizza` or `ice cream`.
  * It has a default response for text messages that don't match what's expected.

## Usage

The following environmental variables need to be set. There's a `.env.SAMPLE` file in the repo. Change its name to `.env`. Choose the default PORT using the `TELNYX_APP_PORT` environment variable. The `config.js` file in the root directory will check that the `.env` file loads the environment variables. It may cause a bug if the `TELNYX_APP_PORT` value in the `.env` file and the `TELNYX_APP_PORT` value in the `config.js` file don't match.

**_Check both TELNYX_APP_PORT values before starting the app to ensure they're the same._**

| Variable               | Description                                                                                                                                              |
|:-----------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `TELNYX_API_KEY`       | Your [Telnyx API Key](https://portal.telnyx.com/#/app/api-keys?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link)              |
| `TELNYX_PUBLIC_KEY`    | Your [Telnyx Public Key](https://portal.telnyx.com/#/app/account/public-key?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link) |
| `TELNYX_APP_PORT`      | **Defaults to `5000`** The port the app will be served                                                                                                   |


### .env file

This app uses the excellent [dotenv](https://github.com/motdotla/dotenv) package to manage environment variables.

Make a copy of [`.env.SAMPLE`](./.env.sample) and save as `.env` and update the variables to match your creds.

```
TELNYX_API_KEY=
TELNYX_PUBLIC_KEY=
TENYX_APP_PORT=5000
```

### Callback URLs For Telnyx Applications

| Callback Type                    | URL                              |
|:---------------------------------|:---------------------------------|
| Inbound Message Callback         | `{ngrok-url}/messaging/inbound`  |
| Outbound Message Status Callback | `{ngrok-url}/messaging/outbound` |

### Install

Run the following commands to get started

```
$ git clone git@github.com:dapperAuteur/telnyx-take-home-test.git
```

### Ngrok

This application is served on the port defined in the runtime environment (or in the `.env` file). Be sure to launch [ngrok](https://developers.telnyx.com/docs/v2/development/ngrok?utm_source=referral&utm_medium=github_referral&utm_campaign=cross-site-link) for that port. Run this command in the directory where you unzipped `ngrok`.

```
./ngrok http 5000
```

> Terminal should look _something_ like

```
ngrok by @inconshreveable                                                                                                                               (Ctrl+C to quit)

Session Status                online
Account                       Little Bobby Tables (Plan: Free)
Version                       2.3.35
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://your-url.ngrok.io -> http://localhost:5000
Forwarding                    https://your-url.ngrok.io -> http://localhost:5000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

At this point you can point your application to generated ngrok URL + path  (Example: `http://{your-url}.ngrok.io/messaging/inbound`). ngrok will produce a unique url each time it starts.

### Messaging With ngrokmessaging-with-ngrok
For messaging, webhooks set the webhook URL on your messaging profile from the Telnyx Portal Messaging dashboard. Edit your Messaging Profile by clicking the “Basic Options” button ✎. Select the “Inbound” section and paste the forwarding address from ngrok into the Webhook URL field. Append `/messaging/inbound` to the end of the URL to direct the request to the webhook endpoint in your local application.

### Run

Start the server using `node index.js` from the root of the project.

When you're able to run the server locally, the final step involves making your application accessible from the internet. So far, we've set up a local web server. This isn't accessible from the public internet.

The best workaround is a tunneling service. They come with client software that runs on your computer and opens an outgoing permanent connection to a publicly available server in a data center. Then, they assign a public URL (typically on a random or custom subdomain) on that server to your account. The public server acts as a proxy that accepts incoming connections to your URL. The public server forwards (tunnels) them through the already established connection. It sends them to the local web server as if they originated from the same machine. The most popular tunneling tool is `ngrok`. Check out the [ngrok setup](https://developers.telnyx.com/docs/v2/development/ngrok) walkthrough to set it up on your computer and start receiving webhooks from inbound messages to your newly created application.

Once you've set up `ngrok` or another tunneling service you can add the public proxy URL to your Inbound Settings  in the Mission Control Portal. To do this, click  the edit symbol [✎] next to your Messaging Profile. In the "Inbound Settings" > "Webhook URL" field, paste the forwarding address from ngrok into the Webhook URL field. Add `messaging/inbound` to the end of the URL to direct the request to the webhook endpoint in your  server.

For now you'll leave “Failover URL” blank, but if you'd like to have Telnyx resend the webhook in the case where sending to the Webhook URL fails, you can specify an alternate address in this field.

Once everything is setup, you should now be able to:
* Text your phone number and receive a response.
* Send a picture to your phone number and get that same picture right back.