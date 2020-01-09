import Link from "gatsby-link";
import React, { Component } from "react";

import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="Header-wrapper">
        <div className="Header san-serif">
          <p id="back-button">
            <Link to="/" className="lightGrayColor">
              joshua timmons
            </Link>
          </p>
          <nav className="publications">
            <Link to="/publications" className="lightGrayColor">
              Publications
            </Link>
            <Link to="/blog" className="lightGrayColor">
              Blog
            </Link>
          </nav>
        </div>
      </div>
    );
  }
}
