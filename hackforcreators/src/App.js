import "./styles.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Home from "./Components/Home";
import Upload from "./Components/Upload";
import Layout from "./Components/Layout";
import { useState } from "react";
import { redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  
  //const isAuthenticated = true;
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [tagss,setTagss] = useState([])
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

  function onsearchhandler(e){
    let tagstring = e.target.value
    setTagss(tagstring.split(","))
    console.log(tagss)
  }

  return (
    <div className="App">
      

      <Navbar className="customNavbar" expand="lg">
        <Container>
          <Navbar.Brand href="/home">
            <p className="NavTitle">
              <img
                height="30em"
                src="https://yt3.googleusercontent.com/ytc/AL5GRJV729QUKo1ixf_WM0CYvVOeT-o_HPbB5x_EI3MZ0A=s900-c-k-c0x00ffffff-no-rj"
              ></img>
              <span> SaimanSays</span> <b>Meme</b> DB
            </p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav className="ml-auto">
              <Nav.Link href = "/upload">
                <div className="UploadBtn">
                  Upload <span class="material-symbols-outlined">upload</span>
                </div>
              </Nav.Link>
              <div>
                <Form>
                  <Form.Group>
                    <Form.Control onChange={(e)=>{onsearchhandler(e)}} type="text" placeholder="Search Memes here" />
                  </Form.Group>
                </Form>
              </div>

              <div style={{cursor:"pointer"}}  className="searchbar">
                <a href = {`home?tags=${tagss}`}>
                <span
                  style={{ verticalAlign: "center" }}
                  class="material-symbols-outlined"
                >
                  search
                </span>
                </a>
              </div>
              {!isAuthenticated && (
                <Nav.Link
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    border: "1px solid white",
                    padding: "2px",
                    marginLeft: "10px",
                  }}
                  href=""
                  onClick={loginWithRedirect}
                >
                  Login <span class="material-symbols-outlined">login</span>
                </Nav.Link>
              )}
              {isAuthenticated && (
                <Nav.Link
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    border: "1px solid white",
                    padding: "2px",
                    marginLeft: "10px",
                  }}
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  href=""
                >
                  Logout <span class="material-symbols-outlined">logout</span>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Layout />}/>
          <Route path="upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}
