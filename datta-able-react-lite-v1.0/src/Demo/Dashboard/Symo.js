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

class Symo extends React.Component {
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
            <iframe src="http://127.0.0.1:8080/" height="1000" width="100%" frameBorder="0"></iframe>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Symo;
