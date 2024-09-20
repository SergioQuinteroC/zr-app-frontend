import { useState, useEffect } from "react";
import Card from "../../Components/Card";
import RealestateDetail from "../../Components/RealestateDetail";
import img from "../../assets/image.jpg";

function Home() {
	const [items, setItems] = useState();
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [filteredItems, setFilteredItems] = useState([]);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/realestates`)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}, []);

	useEffect(() => {
		let newFilteredItems = items?.filter((item) =>
			selectedCategories.includes(item.category)
		);

		if (selectedCategories.length === 0) {
			newFilteredItems = items;
		}

		const groupedItems = {};
		newFilteredItems?.forEach((item) => {
			if (!groupedItems[item.category]) {
				groupedItems[item.category] = [];
			}
			groupedItems[item.category].push(item);
		});

		// Ordenar elementos dentro de cada categoría por precio
		Object.keys(groupedItems).forEach((category) => {
			groupedItems[category].sort((a, b) => a.price - b.price);
		});

		// Concatenar todos los elementos ordenados en un solo array
		setFilteredItems(Object.values(groupedItems).flat());
	}, [items, selectedCategories]);

	const handleCategoryChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setSelectedCategories((prevSelectedCategories) => [
				...prevSelectedCategories,
				value,
			]);
		} else {
			setSelectedCategories((prevSelectedCategories) =>
				prevSelectedCategories.filter((category) => category !== value)
			);
		}
	};

	const handleFiltrar = () => {
		const min =
			minPrice === "" ? Number.NEGATIVE_INFINITY : parseFloat(minPrice);
		const max =
			maxPrice === "" ? Number.POSITIVE_INFINITY : parseFloat(maxPrice);

		const productosFiltrados = filteredItems.filter((item) => {
			if (minPrice !== "" && maxPrice !== "") {
				return item.price >= min && item.price <= max;
			} else if (minPrice !== "") {
				return item.price >= min;
			} else if (maxPrice !== "") {
				return item.price <= max;
			}
			return true; // No se aplicó ningún filtro
		});

		setFilteredItems(productosFiltrados);
	};

	return (
		<>
			<div>
				<div className="relative w-full h-64 md:h-96">
					<img
						src={img}
						alt="Banner"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center">
						<h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold font-outline-1 shadow-black">
							Encuentra el hogar de tus sueños
						</h1>
					</div>
					<div className="absolute inset-31 flex items-center justify-center  bottom-0 left-0 right-0 p-4">
						<div className="bg-white p-4 rounded shadow-lg pointer-events-auto hidden md:block ">
							<div className="flex flex-col md:flex-row justify-center items-center">
								<div className="mb-4 md:mb-0">
									<h2 className="text-lg font-bold">
										Filtrar por precio:
									</h2>
									<div className="flex flex-col md:flex-row items-center">
										<input
											type="number"
											placeholder="Desde"
											className="border border-gray-400 rounded py-2 px-3 w-full md:w-1/2 mb-2 md:mb-0"
											value={minPrice}
											onChange={(e) =>
												setMinPrice(e.target.value)
											}
										/>
										<input
											type="number"
											placeholder="Hasta"
											className="border border-gray-400 rounded py-2 px-3 w-full md:w-1/2 mb-2 md:mb-0"
											value={maxPrice}
											onChange={(e) =>
												setMaxPrice(e.target.value)
											}
										/>
									</div>
									<div className="flex justify-center mt-2">
										<button
											className="bg-customGray-dark hover:bg-black text-white font-bold py-1 px-4 rounded"
											onClick={handleFiltrar}
										>
											Filtrar
										</button>
									</div>
								</div>
								<div className="md:ml-4 md:mb-10">
									<h2 className="text-lg font-bold">
										Filtrar por categoría:
									</h2>
									<select
										className="border border-gray-400 rounded py-2 px-3 w-full"
										value={selectedCategories}
										onChange={(e) =>
											setSelectedCategories(
												Array.from(
													e.target.selectedOptions,
													(option) => option.value
												)
											)
										}
									>
										<option value="Casa/Lote">
											Casa/Lote
										</option>
										<option value="Casa/Apartamento">
											Casa/Apartamento
										</option>
										<option value="Lote">Lote</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center mt-5 ml-10 mr-10">
				<div className="flex-col flex md:flex-row md:justify-center">
					<div className="pl-3 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filteredItems?.map((item) => (
							<Card key={item.id} {...item} />
						))}
					</div>
				</div>
			</div>
			<RealestateDetail />
		</>
	);
}

export default Home;
