import { Grid, Stack, TextField, Button, } from "@mui/material";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BaseCard from "../src/components/baseCard/BaseCard";
import 'react-quill/dist/quill.snow.css'
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
const Addportfolio = () => {

  const [image, setImage] = useState("")
  const [title, setTitle] = useState('')
  const [shortdescription, setShortdescription] = useState('')
  const [description, setDescription] = useState('')
  const [texteditor, setTexteditor] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("admin")
    if (!token) {
      router.push("/adminlogin")
    }
  }, [])

  const handleImage = (e) => {
    const file = e.target.files[0]
    // setInputIimage(file)
    const fileReader = new FileReader()
    fileReader.onload = function (e) {
      setImage(e.target.result)
    }
    fileReader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    console.log(texteditor)
    if (!title || !shortdescription || !description || !image) {
      toast.warn('please fill data !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    else {

      const portfolio = await fetch("/api/addproject", {
        method: "POST",
        body: JSON.stringify({ title, shortdescription, image, description, texteditor }),
        headers: {
          'Content-Type': 'application/json ',
          'Accept': 'application/json',
        }
      })

      // console.log(sevice.data)

      if (portfolio.status) {
        toast.success('portfolio ADD successfully !', {
          position: toast.POSITION.TOP_CENTER
        });

      } else {
        toast.error('invalid user !', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  }

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Add a Portfolio">
            <Stack spacing={3}>
              <TextField
                id="title"
                label="title"
                variant="outlined"
                value={title} onChange={(e) => setTitle(e.target.value)}
              />

              <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFileDisabled" name='photo' onChange={handleImage} />

              <TextField
                id="shortdescription"
                label="shortdescription path"
                type="text"
                variant="outlined"
                value={shortdescription} onChange={(e) => setShortdescription(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={description} onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
            <br />
            <QuillNoSSRWrapper theme="snow" className="my-5" onChange={(e) => setTexteditor(e)} />
            <Button variant="contained" mt={2} onClick={handleSubmit}>
              Add Portfolio
            </Button>
            {/* {texteditor}
            <div>
              {image && <img src={image} alt=""
                style={{ width: "300px", height: "200px" }}
              />}
            </div> */}
          </BaseCard>
        </Grid>
        <ToastContainer />
      </Grid>
    </>
  );
};

export default Addportfolio;
