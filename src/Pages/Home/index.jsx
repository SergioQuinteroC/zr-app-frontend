// import { useState } from "react";
import Card from "../../Components/Card";
import RealestateDetail from "../../Components/RealestateDetail";
import Layout from "./../../Components/Layout";
// import { useEffect } from "react";

function Home() {
	// const [property, setProperty] = useState();

	// useEffect(() => {
	// 	fetch('url')
	// 	.then(response => response.json())
	// }, [])

	return (
		<Layout>
			<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
			<RealestateDetail />
		</Layout>
	);
}

export default Home;
