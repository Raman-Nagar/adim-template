import connectDB from "../../server/conection/connectDB"
import NextCors from 'nextjs-cors';
import nodemailer from 'nodemailer'
import ContactSchema from "../../server/models/cotactShema"

async function handler(req, res) {

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    if (req.method === "POST") {
        const data = req.body
        if (!data.name || !data.email || !data.number || !data.subject || !data.message) {

            res.status(400).json({ message: 'Bad request' })
        }
        try {

            const CONTACT_MESSAGE_FIELDS = {
                name: "Name",
                email: "Email",
                number: "Number",
                subject: "Subject",
                message: "Message",
            }
            const stringData = Object.entries(data).reduce((str, [key, val]) => str += `${CONTACT_MESSAGE_FIELDS[key]} : \n ${val} \n \n`, "")

            const htmlData = Object.entries(data).reduce((str, [key, val]) => str += `<div style="display: flex; flex-direction: column; justify-content:space-around; gap:2rem; align-items: center; margin:5px 10px;"><h3>${CONTACT_MESSAGE_FIELDS[key]}</h3><p>${" "} : ${" "}<p> <p>${val}</p></div>`, "")

            const mailOptions = {
                from: "ramannagar08082000@gmail.com",
                to: "ramannagar08082000@gmail.com",
                subject: data.subject,
                text: stringData,
                html: `<!doctype html>
        <html lang="en">
        
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
         <title>Contaact</title>
        </head>
        
        <body>
          <div style="width:70%; margin:auto;">
            <h1>Contaact</h1>
           <div >${htmlData}</div>
          </div>
        </body>
        </html>`,
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    // user: process.env.EMAIL,
                    user: "ramannagar08082000@gmail.com",
                    pass: "wolndopzyvsuarfn",
                }
            })

            await transporter.sendMail(mailOptions,async (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(401).json({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    const user = new ContactSchema({
                        name: data.name ,
                        email: data.email ,
                        number: data.number ,
                        subject: data.subject ,
                        message: data.message ,
                    })
                    const result = await user.save()
                    res.status(201).json({ status: 201, message: "Email sent Succsfully", result })
                }
            })
        } catch (err) {
            return res.status(400).json({ message: 'Bad request' })
        }
    }
}

export default connectDB(handler);
