const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/random-action", (req, res) => {
  // Generate a random number between 0 and 100
  const randomNumber = Math.floor(Math.random() * 101);

  // Log the random number for debugging
  console.log("Generated random number:", randomNumber);

  // Determine the message based on the random number
  let message;
  if (randomNumber < 50) {
    message = "The number is less than 50.";
  } else {
    message = "The number is 50 or greater.";
  }

  // Send the response
  res.json({
    randomNumber: randomNumber,
    message: message,
  });
});

app.post("/webhooks/revenuecat", (req, res) => {
  const event = req.body;

  console.log(event);
  console.log(event.subscriber);

  if (event.type === "SUBSCRIBER_CANCELED") {
    const { subscriber } = event;

    // Aboneliği iptal edilen kullanıcının verilerini burada işle
    console.log(`Abonelik iptal edildi: ${subscriber.id}`);
    // Kullanıcı veritabanında aboneliği iptal olarak işaretle veya ilgili işlemi gerçekleştir
  }

  res.status(200).send("Webhook received");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
