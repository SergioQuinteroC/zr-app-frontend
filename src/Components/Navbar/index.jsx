import { useContext } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { ZRAppContext } from "../../Context";
import Cookies from "js-cookie";

const Navbar = () => {
	const navigate = useNavigate();

	const { isLogged, setIsLogged } = useContext(ZRAppContext);

	const handleLogout = () => {
		setIsLogged(false);
		Cookies.remove("token");
		window.location.reload();
	};

	const defaultStyle =
		"block py-2 px-3 text-white rounded md:bg-transparent md:p-0 md:dark:bg-transparent";
	const activeStyle =
		"block py-2 px-3 text-dark-600 rounded md:bg-transparent md:p-0 md:dark:bg-transparent";

	const handleLoginClick = () => {
		if (isLogged) {
			// Si el usuario ya está logueado, redirigir al dashboard
			console.log("Dashboard");
			navigate("/dashboard");
		} else {
			// Si no está logueado, permitir ir al login
			navigate("/login");
		}
	};
	return (
		<nav className="bg-custom1 border-gray-200 dark:bg-customGray-light">
			<div className="max-w-screen-xl flex flex-wrap gap-3 items-center justify-between mx-auto lg:p-4 sm:p-2">
				<NavLink to="/" className="flex space-x-3 rtl:space-x-reverse">
					<img
						src="/realestate.svg"
						className="h-8"
						alt="ZR App Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						ZR App
					</span>
				</NavLink>
				<ul className="flex items-center gap-3 font-medium p-4 md:p-0 mt-4 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-white dark:bg-customGray-light md:dark:bg-customGray-light dark:customGray-light">
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? activeStyle : defaultStyle
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						{isLogged ? (
							<button
								onClick={handleLogout}
								className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 md:dark:bg-transparent"
							>
								Salir
							</button>
						) : (
							<button
								onClick={handleLoginClick}
								className={({ isActive }) =>
									isActive ? activeStyle : defaultStyle
								}
							>
								Login
							</button>
						)}
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
