import Services from "../../server/models/servicesSchema"
import connectToDatabase from '../../server/conection/mongodb';
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path'
import next from "next";

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post((req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.status(200).json({ data: 'success' });
});

export default apiRoute;

    // try {
    //     const date = moment(new Date()).format("YYYY-MM-DD")
    //     const result = await userImg.create({
    //         category: req.body.category,
    //         images: req.files,
    //         date: date
    //     })
    //     if (result) {
    //         res.status(201).json({ status: 201, result })
    //     } else {
    //         res.status(401).json({ status: 401, message: "fill all the data" })
    //     }
    // } catch (error) {
    //     res.status(401).json({ status: 401, message: "fill all the data" })
    // }
// })
// export default handler;

// // .use(upload.single("image"))