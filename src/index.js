import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Publications from "./Publications";
import Writing from "./Writing";

import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/publications" component={Publications} />
			<Route path="/writing" component={Writing} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
