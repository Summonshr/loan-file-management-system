import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home'
import FileUploader from './FileUploader'
function App() {
	return (
		<Router>
			<div className="w-full min-h-screen bg-green-100 flex justify-center">
				<div className="container">
					<div className="max-w-3xl mx-auto">
						<Route exact path="/" component={Home} />
						<Route path="/loans/:foracid" component={FileUploader} />
					</div>
				</div>
			</div>
		</Router>
	);
}



function About() {
	return (
		<div>
			<h2>About</h2>
		</div>
	);
}

function Topics({ match }) {
	return (
		<div>
			<h2>Topics</h2>
			<ul>
				<li>
					<Link to={`${match.url}/rendering`}>Rendering with React</Link>
				</li>
				<li>
					<Link to={`${match.url}/components`}>Components</Link>
				</li>
				<li>
					<Link to={`${match.url}/props-v-state`}>Props v. State</Link>
				</li>
			</ul>

			<Route path={`${match.path}/:topicId`} component={Topic} />
			<Route
				exact
				path={match.path}
				render={() => <h3>Please select a topic.</h3>}
			/>
		</div>
	);
}

function Topic({ match }) {
	return (
		<div>
			<h3>{match.params.topicId}</h3>
		</div>
	);
}
export default App;
