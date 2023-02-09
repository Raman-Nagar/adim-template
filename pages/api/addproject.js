import connectDB from "../../server/conection/connectDB";
import Portfolio from "../../server/models/casestudiesSchema"

async function handler(req, res) {

    console.log(req.body)
    const { title, image, description, shortdescription, texteditor } = req.body
    if (req.method == 'POST') {

        let portfolio = new Portfolio({
            title, image, description, shortdescription, texteditor
        })
        let result = await portfolio.save()
        res.status(200).json({ result })
    } else {
        res.status(400).json({ err: "this is error" })
    }
}

export default connectDB(handler)
