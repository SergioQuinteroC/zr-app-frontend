import { createContext, useState } from "react";

export const ZRAppContext = createContext();

export const ZRAppProvider = ({ children }) => {
	const [isDetailOpen, setIsDetailOpen] = useState(false);
	const openRealestateDetail = () => setIsDetailOpen(true);
	const closeRealestateDetail = () => setIsDetailOpen(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLogged, setIsLogged] = useState(false);

	const [estateToShow, setEstateToShow] = useState({
		title: "",
		price: "",
		address: "",
		description: "",
		images: [],
	});

	return (
		<ZRAppContext.Provider
			value={{
				isDetailOpen,
				openRealestateDetail,
				closeRealestateDetail,
				estateToShow,
				setEstateToShow,
				isAuthenticated,
				setIsAuthenticated,
				isLogged,
				setIsLogged,
			}}
		>
			{children}
		</ZRAppContext.Provider>
	);
};
