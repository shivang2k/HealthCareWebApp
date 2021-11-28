/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import Aux from "../../hoc/_Aux";

import axios from "axios";

import DEMO from "../../store/constant";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";

class Skin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: "",
      file: null,
      result: "",
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleImagePreview = this.handleImagePreview.bind(this);
  }

  handleImagePreview(previewEvent) {
    this.setState({
      file: URL.createObjectURL(previewEvent.target.files[0]),
    });
  }

  handleUploadImage(ev) {
    ev.preventDefault();
    const fileToUpload = this.state.file;
    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    data.append("filename", this.fileName.value);

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    //console.log(data);
    axios
      .post("http://127.0.0.1:5000/api/skin", data, config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          result: res.data,
        });
      });
  }

  componentDidMount() {
    // axios.get("http://127.0.0.1:5000/flask/hello").then((res) => {
    //   const Message = res.data.message;
    //   this.setState({ Message });
    //   console.log({ Message });
    // });
  }

  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Skin Infection Detection</Card.Title>
              </Card.Header>
              <Card.Body>
                {/* <h5>Form controls</h5>
                <hr /> */}
                <Row>
                  <Col md={6}>
                    <Form
                      action="http://127.0.0.1:5000/flask/hello"
                      method="post"
                      onSubmit={this.handleUploadImage}
                      encType="multipart/form-data"
                    >
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter Name" />
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Parient Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" />
                      </Form.Group>

                      {/* <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group> */}
                      {/* <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group> */}
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Patient Age</Form.Label>
                      <Form.Control type="number" placeholder="Age" />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>File Name</Form.Label>
                      <Form.Control
                        ref={(ref) => {
                          this.fileName = ref;
                        }}
                        type="text"
                        placeholder="Enter the desired name of file"
                      />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.file">
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control
                        ref={(ref) => {
                          this.uploadInput = ref;
                        }}
                        type="file"
                        onChange={this.handleImagePreview}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {this.state.result.length > 0 && 
                  <h3>Result: {this.state.result}</h3>
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Skin;
