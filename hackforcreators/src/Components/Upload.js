import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Form, Button } from "react-bootstrap";
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fileTypes = ["JPG", "PNG", "GIF"];

function Upload(){
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const notify = () => toast("Uploaded to Database 🎉");

    const handleChange = (file) => {
        setFile(file);
    };

    function onSubmit(){
        console.log(file)
        console.log(tags)
        console.log({"file":file,"tags":tags, "title":title,"description": description })

        const formData = new FormData();
        formData.append("file", file);
        //console.log(formData)

        const formobj = new Blob([JSON.stringify({
            "tags":tags, "title":title,"description": description
        })], {
         type: 'application/json'
        })

        formData.append("jsondata",formobj)

        axios.post("http://127.0.0.1:5000/api/uploadmeme/",formData)
            .then(notify())
    }

    return(
    <div className="Upload">
        <div style={{display:"flex", flexDirection:"column", flexGrow:3}}>
            <div style={{ display:"flex", width:"100%",justifyContent:"center"}}>
                <FileUploader style={{width:"100%",border:"1px solid"}} handleChange={handleChange} name="file" types={fileTypes} />
            </div>
            <div style={{marginTop:"10px"}}>
                <Form>
                <Form.Group className="mb-3">
                    <Form.Control onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter Title" />
                    <Form.Text className="text-muted" >
                    Title is important! Make sure it is relevant to meme template
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control as="textarea" onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Description" />
                </Form.Group>

                <Form.Group className="mb-3">
                <InputTags placeholder="Tags" values={tags} onTags={(value) => setTags(value.values)} />
                <Form.Text className="text-muted">
                    Enter upto 5 tags to make it searchable
                </Form.Text>
                </Form.Group>

                <Button onClick={()=>onSubmit()} variant="primary" >
                    Submit
                </Button>
                </Form>
            </div>
        </div>
        <div style={{marginLeft:"10%", flexGrow:1, width:"20vw"}}>
            {file && <img width="100%" src={URL.createObjectURL(file)}></img>}
        </div>
        <ToastContainer theme="dark" position="bottom-right" />
    </div>
    )
}
export default Upload