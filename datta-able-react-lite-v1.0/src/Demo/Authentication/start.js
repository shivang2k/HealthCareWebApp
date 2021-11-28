/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";
import "./../../assets/scss/style.scss";
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";

class Start extends React.Component {
  render() {
    return (
      <Aux>
        <Breadcrumb />
        <div className="auth-wrapper">
          {/* <div className="auth-content"> */}
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div class="row col-xl-6 col-md-6">
              <Col md={6} xl={6}>
                <div className="card">
                  <div className="card-body text-center">
                    <div className="mb-4">
                      <i className="feather icon-unlock auth-icon" />
                    </div>
                    <h3 className="mb-4">Login as Patient</h3>
                    
                    <NavLink to="/signinp">
                      <button className="btn btn-primary shadow-2 mb-4">
                        Login{" "}
                      </button>
                    </NavLink>
                  </div>
                </div>
              </Col>
              <Col  md={6} xl={6}>
                <div className="card">
                  <div className="card-body text-center">
                    <div className="mb-4">
                      <i className="feather icon-unlock auth-icon" />
                    </div>
                    <h3 className="mb-4">Login as Doctor</h3>
                    
                
                    <NavLink to="/signin">
                      <button className="btn btn-primary shadow-2 mb-4">
                        Login{" "}
                      </button>
                    </NavLink>
                    
                  </div>
                </div>
              </Col>
            </div>
          </div>
      </Aux>
    );
  }
}

export default Start;
