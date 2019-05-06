import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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


export default App;
