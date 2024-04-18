import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { Resend } from 'resend';

const app = express();
app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true, limit:"16kb"}))

app.use(express.static("public"))

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const resend = new Resend('re_a9JY7a6r_3bwCbufPvQezoqcVD1mkbFHs');

  app.post('/send-email', async(req, res) => {
    const { to, subject, text } = req.body
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: 'asadansari905811@gmail.com',
      subject: "{subject}",
      html: "<p>GLA PORTAL BANAYE !!!</strong>!</p>"
    });
    if (error) {
      return console.error({ error });
    }
  
    console.log({ data });

})

export { app };




