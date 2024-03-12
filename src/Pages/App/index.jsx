import "./App.css";
import Home from "../Home";
import Detail from "../Detail";
import Dashboard from "../Dashboard";
import NotFound from "../NotFound";
import SignIn from "../SignIn";

function App() {
	return (
		<>
			<div className="text-center text-2xl font-bold">
				<Home />
				<Detail />
				<Dashboard />
				<NotFound />
				<SignIn />
			</div>
		</>
	);
}

export default App;
