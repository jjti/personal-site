import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Blog, Publications, Writing } from "./pages";

import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/publications" component={Publications} />
			<Route path="/writing" component={Writing} />
			<Route path="/blog" component={Blog} />
			<Route exact path="/" component={App} />
			<Route path="*" component={() => <Redirect to="/" />} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
