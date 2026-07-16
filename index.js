const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "2668677";
const ACCESS_TOKEN = "EAAXSgkgfJY0BR9ZBWeCFZCVbT2fPdLbNPzAp18SZBbqOmpYUl8NVZAgtx1M1dLxs4o7ZBGRsMKAFHutVvcarRMdbVQiKoyeRWFAnMSWLToX6ZCP8hQu99vXMf25cw4zPQjQIItbKWVZAOOX1JvjlOI5g8VZBNZBMAWer9KJ0ZAZAdixRJKzmT8BvWkqGTGpfH18tGD6BwZDZD";
const PHONE_NUMBER_ID = "1214381928423898";

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  try {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message) {
      await axios.post(
        https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages,
        {
          messaging_product: "whatsapp",
          to: message.from,
          type: "text",
          text: {
            body:
Assalam-o-Alaikum! 🌸

Hum se rabta karne ka shukriya.

Kaam ki tamam details hasil karne ke liye neeche diya gaya WhatsApp group join karein.

🔗 https://chat.whatsapp.com/IYxkIEFRBrvK5QMdD45pPK
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

app.listen(process.env.PORT  3000);
