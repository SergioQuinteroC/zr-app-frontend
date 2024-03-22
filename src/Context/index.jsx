import { createContext, useState } from "react";

export const ZRAppContext = createContext();

export const ZRAppProvider = ({ children }) => {
	const [isDetailOpen, setIsDetailOpen] = useState(false);
	const openRealestateDetail = () => setIsDetailOpen(true);
	const closeRealestateDetail = () => setIsDetailOpen(false);

	return (
		<ZRAppContext.Provider
			value={{
				isDetailOpen,
				openRealestateDetail,
				closeRealestateDetail,
			}}
		>
			{children}
		</ZRAppContext.Provider>
	);
};
