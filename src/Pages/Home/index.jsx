import { useState, useEffect } from "react";
import Card from "../../Components/Card";
import RealestateDetail from "../../Components/RealestateDetail";
import Layout from "./../../Components/Layout";

function Home() {
	const [items, setItems] = useState();

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/realestates`)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}, []);

	return (
		<>
			<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{items
					?.filter((item) => item.status == "active")
					.map((item) => (
						<Card key={item.id} {...item} />
					))}
			</div>
			<RealestateDetail />
		</>
	);
}

export default Home;
