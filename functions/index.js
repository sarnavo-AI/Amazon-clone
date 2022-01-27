const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const {response} = require("express");

const stripe = require("stripe")("sk_test_51KLTqhSJ8843tiRLewMbqDxwqjQxdlEnFEmYuTn2knaguiSTMSImGcKfFcSLH6JVAS1glZ9saRRXGFjXkLaeQrQ500i2SBp4EG");

// App config
const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

// MiddleWares
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.get("/", (req, res) => res.status(200).send("Wassup World"));

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;

    console.log("Payment Request Recieved", total);

    const paymentIntent = await stripe.paymentIntent.create({
        amount: total,
        currency: "usd",
    });

    // OK - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// Listen Command
exports.api = functions.https.onRequest(app);
