import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { InputTags } from 'react-bootstrap-tagsinput'
import {
    FacebookShareButton,
    PinterestShareButton,
    RedditShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";

import {
    FacebookIcon,
    PinterestIcon,
    RedditIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

function Layout(){
    const [queryParameters] = useSearchParams()
    const [memesarr,setMemes] = useState([])
    const [redditposts,setRedditposts] = useState([])


    useEffect(() => {
        console.log(memesarr)
        if (queryParameters.get("tags")!=null){
            let tags = queryParameters.get("tags").split(",")
            axios.post("http://127.0.0.1:5000/api/getMeme/",{tags})
            .then((res)=>{
                setMemes(res.data.data);
                setRedditposts(res.data.redditposts);
                console.log(res.data.redditposts);
            })
        }
        else{
            axios.post("http://127.0.0.1:5000/api/getMeme/",{"tags":[]})
            .then((res)=>{
                setMemes(res.data.data);
                setRedditposts(res.data.redditposts);
                console.log(res.data.redditposts);
            })
        }
        
      }, []);
    
    

    //let memesarr = [{"image":"","title":"","tags":["a","b","c"],"description":""}]
    return(
    <div className="layout">
        <div className="memes">
            {memesarr.map((item, i) => {
            return(
            <div className="meme">
            <br/>
            {/*JSON.stringify(item)*/}

            <Card style={{ width: '100%', display:"flex", alignItems:"center" }}>
            <Card.Img variant="top" src={item.file} style={{width:"30em"}}/>
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>
                <InputTags style={{pointerEvents:"none", outline: "none"}} readonly  placeholder="" values={item.tags} onTags={(value) => {}} />
                <div>
                    <FacebookShareButton quote="Check out this funny meme template" url={item.file}><FacebookIcon round="true" size="2em"/></FacebookShareButton>
                    <TwitterShareButton title="Check out this funny meme template" url={item.file}><TwitterIcon round="true" size="2em"/></TwitterShareButton>
                    <RedditShareButton><RedditIcon round="true" size="2em"/></RedditShareButton>
                    <PinterestShareButton><PinterestIcon round="true" size="2em" /></PinterestShareButton>
                    <WhatsappShareButton><WhatsappIcon round="true" size="2em"/></WhatsappShareButton>
                </div>
                
            </Card.Body>
            </Card>

            <div>
                
            </div>
            </div>
            )
            })}
        </div>
        <div className="myfeed">
            <div className="feeds">
                <div>Feed</div>
                {redditposts.map((rp, index) => {
                return(
                <>
                <div className="indieposts" >
                    <div><b>{rp["Post Title"]}</b></div>
                    {rp.Comments.map((p,i)=>{
                        return(<div className="comments">{p}</div>)
                    })}
                </div>
                <br/>
                </>
                )
                })}
            </div>
            
        </div>
        {/*<button onClick={()=>{console.log(queryParameters.get("tags").split(","))}}>A</button>*/}
    </div>
    )
}
export default Layout