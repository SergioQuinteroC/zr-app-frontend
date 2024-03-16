import { NavLink } from "react-router-dom";

const Navbar = () => {
	const defaultStyle =
		"block py-2 px-3 text-white rounded md:bg-transparent md:p-0 md:dark:bg-transparent";
	const activeStyle =
		"block py-2 px-3 text-blue-700 rounded md:bg-transparent md:p-0 md:dark:bg-transparent";
	return (
		<nav className="bg-white border-gray-200 dark:bg-blue-300">
			<div className="max-w-screen-xl flex flex-wrap gap-3 items-center justify-between mx-auto p-4">
				<NavLink
					to="/"
					className="flex space-x-3 rtl:space-x-reverse"
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
				<ul className="flex items-center gap-3 font-medium p-4 md:p-0 mt-4 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-white dark:bg-blue-300 md:dark:bg-blue-300 dark:blue-300">
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
		</nav>
	);
};

export default Navbar;
