import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ZRAppContext } from "../../Context";

const ProtectedRoute = ({ component: Component }) => {
	const {isAuthenticated, setIsAuthenticated} = useContext(ZRAppContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			const token = Cookies.get("token");
			if (token) {
				try {
					const response = await fetch(
						"http://localhost:3000/api/v1/auth/verify-token",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ token: token }),
						}
					);
					if (response.ok || response.status === 200) {
						setIsAuthenticated(true);
					}
				} catch (error) {
					setIsAuthenticated(false);
				}
			}
			setIsLoading(false);
		};

		checkAuth();
	}, []);

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	return <>{isAuthenticated ? <Component /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
