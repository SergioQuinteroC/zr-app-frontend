import { useRoutes, BrowserRouter } from "react-router-dom";

import { ZRAppProvider } from "../../Context";
import "./App.css";
import Home from "../Home";
import Detail from "../Detail";
import Dashboard from "../Dashboard";
import Login from "../Login";
import NotFound from "../NotFound";
import Navbar from "../../Components/Navbar";
import Layout from "../../Components/Layout";
import ProtectedRoute from "../../Components/ProtectedRoute";

const AppRoutes = () => {
	const routes = useRoutes([
		{ path: "/", element: <Home /> },
		{
			path: "/detail/:id",
			element: <ProtectedRoute component={Detail} />,
		},
		{
			path: "/dashboard",
			element: <ProtectedRoute component={Dashboard} />,
		},
		{ path: "/login", element: <Login /> },
		{ path: "/*", element: <NotFound /> },
	]);
	return routes;
};
const App = () => {
	return (
		<ZRAppProvider>
			<BrowserRouter>
				<Navbar />
				<Layout>
					<AppRoutes />
				</Layout>
			</BrowserRouter>
		</ZRAppProvider>
	);
};

export default App;
