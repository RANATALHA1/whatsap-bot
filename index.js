const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "2668677";
const ACCESS_TOKEN = "EAAXSgkgfJY0BRxiH3dtBcy4gFpfZC4yeGpzZBdXT9xZCH1fC1DbaP83wJj42oSiggFstnzZBRgqNowGjhW4LVpI1RTxeF2XBKmsZBZBqrIz2dxdLhUt2dTJX2ebCAHqEglnKSd47N4amCKNGyntv7Cp8Jl4pm4pccFnvcWxAAwZANaK9nS51HCOWhYeAF2a4MQ6ZBwZDZD";
const PHONE_NUMBER_ID = "1214381928423898";

// Webhook Verification
app.get("/webhook", (req, res) => {
const mode = req.query["hub.mode"];
const token = req.query["hub.verify_token"];
const challenge = req.query["hub.challenge"];

if (mode === "subscribe" && token === VERIFY_TOKEN) {
return res.status(200).send(challenge);
}

return res.sendStatus(403);
});

// Receive Messages
app.post("/webhook", async (req, res) => {
try {
console.log("WEBHOOK RECEIVED");
console.log(JSON.stringify(req.body, null, 2));

const message =
req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

if (message) {
await axios.post(
`https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`,
{
messaging_product: "whatsapp",
to: message.from,
type: "text",
text: {
body: `Assalam-o-Alaikum! 🌸

Hum se rabta karne ka shukriya.

Kaam ki tamam details hasil karne ke liye neeche diye gaye WhatsApp group ko join karein.

🔗 https://chat.whatsapp.com/IYxkIEFRBrvK5QMdD45pPK

Shukriya!`
}
},
{
headers: {
Authorization: `Bearer ${ACCESS_TOKEN}`,
"Content-Type": "application/json"
}
}
);
}

res.sendStatus(200);
} catch (err) {
console.error(err.response?.data || err.message);
res.sendStatus(500);
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
