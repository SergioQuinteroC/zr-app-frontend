import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../../Components/Carousel";
import ListBuyers from "../../Components/ListBuyers";

function Detail() {
	const { id } = useParams();
	const [estate, setEstate] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/realestates/${id}/buyers`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${Cookies.get("token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setEstate(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="py-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
				<div className="flex flex-col md:flex-row -mx-4">
					<div className="md:flex-1 px-4">
						<Carousel slides={estate?.images} />
					</div>
					<div className="md:flex-1 px-4">
						<h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
							{estate?.title}
						</h2>
						<p className="text-gray-500 text-sm">
							{estate?.address}
						</p>

						<div className="flex items-center space-x-4 my-4">
							<div>
								<div className="rounded-lg bg-gray-100 flex py-2 px-3">
									<span className="mr-1 mt-1">$</span>
									<span className="font-bold text-3xl">
										{new Intl.NumberFormat().format(
											estate?.price
										)}
									</span>
								</div>
							</div>
						</div>

						<p className="text-gray-500">{estate?.description}</p>
					</div>
				</div>
			</div>
			<div className="py-6">
				<ListBuyers buyers={estate?.buyers} idRealEstate={id} />
			</div>
		</div>
	);
}

export default Detail;
