import Link from "gatsby-link";
import React from "react";

import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

export default () => (
  <div>
    <Header />
    <section>
      <h1>Not Found</h1>
      <p>You just hit a route that doesn't exist... the sadness.</p>
      <p>
        Use a link in the header or footer, or{" "}
        <span>
          <Link to="/">click here</Link>
        </span>
        {", "}
        to navigate to the rest of the site
      </p>
    </section>
    <Footer />
  </div>
);
