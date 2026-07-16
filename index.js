const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "2668677";
const ACCESS_TOKEN = "EAAXSgkgfJY0BR9r6dDJOlSaZA4bVfZCs5vMZBWcqybRc8UMgN38GYDJLOcpr68N8tH6N8ZCznZAq34BqBSHEeq4rZCxBsAKB7edJ2bVLFTvAuW6wgOfROzeqjFA7X7AuuZBBWTnyoWYRU6ZBlbJzqojNYuSxr7ivvafJZAA8YZC1lgnhHyKsEqXZBr1UUNIyTWzouwYbgZDZD";
const PHONE_NUMBER_ID = "1214381928423898";

// Webhook Verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Receive Messages
app.post("/webhook", async (req, res) => {
  try {
    const message =
      req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message) {
      await axios.post(
        https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages,
        {
          messaging_product: "whatsapp",
          to: message.from,
          type: "text",
          text: {
            body: Assalam-o-Alaikum! 🌸

Hum se rabta karne ka shukriya.

Kaam ki tamam details hasil karne ke liye neeche diye gaye WhatsApp group ko join karein.

🔗 https://chat.whatsapp.com/IYxkIEFRBrvK5QMdD45pPK

Shukriya!
          }
        },
        {
          headers: {
            Authorization: Bearer ${ACCESS_TOKEN},
            "Content-Type": "application/json"
          }
        }
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err.response?.data  err.message);
    res.sendStatus(500);
  }
});

// Start Server
const PORT = process.env.PORT  3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
