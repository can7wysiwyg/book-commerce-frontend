import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { useState } from "react";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";


function BookUpdatePicture() {
    const { id } = useParams();
    const state = useContext(GlobalState);
    const token = state.token;
    const [bookImage, setImage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let formData = new FormData();
        formData.append("bookImage", bookImage);

        await axios.put(`/book/update_image/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        window.location.href = `/book_single/${id}`


    }
    



    return(<>

<Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
          <h1 style={{fontFamily: "Times New Roman"}}>upload new book image</h1>
 
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicBookImage">
            
                <Form.Control
                  type="file"
                  onChange={(event) => setImage(event.target.files[0])}
                  required
                />
              </Form.Group>

              <Button variant="warning" type="submit">
                upload new book
              </Button>
              </Form>
              </Col>
              </Row>
              </Container>

    
    
    </>)
}

export default BookUpdatePicture