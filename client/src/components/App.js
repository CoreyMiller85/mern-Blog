import { Routes, Route } from "react-router-dom";
import About from "./About/About";
import Home from "./Home/Home";
import RegisterLogin from "./RegisterLogin/RegisterLogin";

import Register from "./RegisterLogin/Register";
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<RegisterLogin />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
