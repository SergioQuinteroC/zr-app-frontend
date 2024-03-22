import { useState, useEffect } from "react";
import Card from "../../Components/Card";
import RealestateDetail from "../../Components/RealestateDetail";
import Layout from "./../../Components/Layout";

function Home() {
	const [items, setItems] = useState();

	useEffect(() => {
		fetch(`http://localhost:3000/api/v1/realestates`)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}, []);

	return (
		<Layout>
			<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{items?.map((item) => (
					<Card key={item.id} {...item} />
				))}
			</div>
			<RealestateDetail />
		</Layout>
	);
}

export default Home;
