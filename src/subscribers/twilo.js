import dotenv from 'dotenv';
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const phoneNumber = process.env.MY_PHONE_NUMBER;

const receiverPhoneNumber = process.env.RECEVEIR_PHONE_NUMBER || "+250788782635";

export function makePhoneCall() {
  console.log("I am here")
  client.calls
    .create({
      from:phoneNumber,
      to: receiverPhoneNumber,     
      url: 'http://demo.twilio.com/docs/voice.xml'
  })
  .then(call => console.log(call.sid))
  .catch(err => console.log("error", err));
}
