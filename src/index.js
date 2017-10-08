import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Blog, Publications } from "./pages";
import App from "./App.jsx";

import "./qtcreator_light.css";
import "./index.css";

class TrackPageView extends React.Component {
	componentWillMount() {
		window.scrollTo(0, 0);
	}
	componentWillUpdate() {
		window.scrollTo(0, 0);
	}
	render() {
		return this.props.children;
	}
}

ReactDOM.render(
	<BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
		<TrackPageView>
			<Switch>
				<Route path="/publications" component={Publications} />
				<Route path="/blog" component={Blog} />
				<Route exact path="/" component={App} />
				<Route path="*" component={() => <Redirect to="/" />} />
			</Switch>
		</TrackPageView>
	</BrowserRouter>,
	document.getElementById("root")
);
