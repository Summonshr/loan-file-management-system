import React from "react";
import { BrowserRouter as Router, Route, NavLink as Link } from "react-router-dom";
import Alert from 'react-s-alert';
import FileUploader from './FileUploader'
import Search from './Search';
function App() {
	return (
		<Router>
			<div className="w-full min-h-screen bg-red-100">
				<div className="w-full bg-white px-4">
					<div className="max-w-5xl flex justify-between mx-auto">
						<div className="navbar-header">
							<Link to="/">
								<img src="https://www.nicasiabank.com/uploads/logo.png" alt="logo.png" />
							</Link>
						</div>
						<Route path="/" component={Search} />

					</div>
				</div>
				<div className="container mx-auto">
					<div className="max-w-5xl mx-auto">
						<Route path="/loans/:foracid" component={FileUploader} />
					</div>
				</div>
			</div>
			<Alert stack={false} />
		</Router>
	);
}


export default App;
