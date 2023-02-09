import connectDB from "../../server/conection/connectDB";
import Services from "../../server/models/servicesSchema"

async function handler(req, res) {
    try {

        console.log(req.body)
        if (req.method == 'POST') {
            const { title, image, description, shortdescription, texteditor } = req.body

            let service = new Services({
                title, image, description, shortdescription, texteditor
            })
            let result = await service.save()
            res.status(200).json({ result })
        } else {
            res.status(400).json({ err: "this is error" })
        }
    } catch (err) {
        console.log(err)
    }
}

export default connectDB(handler)
