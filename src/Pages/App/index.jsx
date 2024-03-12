import { useRoutes, BrowserRouter } from "react-router-dom";

import "./App.css";
import Home from "../Home";
import Detail from "../Detail";
import Dashboard from "../Dashboard";
import Login from "../Login";
import NotFound from "../NotFound";

const AppRoutes = () => {
	const routes = useRoutes([
		{ path: "/", element: <Home /> },
		{ path: "/detail", element: <Detail /> },
		{ path: "/dashboard", element: <Dashboard /> },
		{ path: "/login", element: <Login /> },
		{ path: "/*", element: <NotFound /> },
	]);
	return routes;
};
const App = () => {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
};

export default App;
