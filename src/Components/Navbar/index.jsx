import { NavLink } from "react-router-dom";

const Navbar = () => {
	const defaultStyle =
		"block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:bg-blue-600 md:dark:bg-transparent";
	const activeStyle =
		"block py-2 px-3 text-blue-700 bg-blue-700 rounded md:bg-transparent md:p-0 dark:bg-blue-600 md:dark:bg-transparent";
	return (
		<nav className="bg-white border-gray-200 dark:bg-blue-300 dark:border-red-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<NavLink
					to="/"
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img
						src="/realestate.svg"
						className="h-8"
						alt="ZR App Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						ZR App
					</span>
				</NavLink>
				<div
					className="hidden w-full md:block md:w-auto"
					id="navbar-dropdown"
				>
					<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-blue-300 md:dark:bg-blue-300 dark:blue-300">
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
							<NavLink
								to="/login"
								className={({ isActive }) =>
									isActive ? activeStyle : defaultStyle
								}
							>
								Login
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
