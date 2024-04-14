import { useState, useEffect } from "react";
import Card from "../../Components/Card";
import RealestateDetail from "../../Components/RealestateDetail";

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
			<div className="flex-row flex">
				<div className="top-0 sticky start w-full max-w-72 max-h-screen">
					<aside className="">
						<div>
							<h2>Filtrar por precio:</h2>
							<div className=" my-4">
								<div className="w-full max-w-lg">
									<div className="flex items-center justify-between">
										<input
											type="number"
											placeholder="Desde"
											className="border border-gray-400 rounded py-2 px-3 w-1/2 mr-2"
											value={minPrice}
											onChange={(e) =>
												setMinPrice(e.target.value)
											}
										/>
										<input
											type="number"
											placeholder="Hasta"
											className="border border-gray-400 rounded py-2 px-3 w-1/2 ml-2"
											value={maxPrice}
											onChange={(e) =>
												setMaxPrice(e.target.value)
											}
										/>
									</div>
								</div>
								<div className="flex justify-center">
									<button
										className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 my-2 px-4 rounded "
										onClick={handleFiltrar}
									>
										Filtrar
									</button>
								</div>
							</div>
						</div>

						<div className="text-lg">
							<h2>Filtrar por categoría:</h2>
							<div>
								<input
									type="checkbox"
									id="casa-lote"
									value="Casa/Lote"
									checked={selectedCategories.includes(
										"Casa/Lote"
									)}
									onChange={handleCategoryChange}
								/>
								<label htmlFor="casa-lote">Casa/Lote</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="casa-apartamento"
									value="Casa/Apartamento"
									checked={selectedCategories.includes(
										"Casa/Apartamento"
									)}
									onChange={handleCategoryChange}
								/>
								<label htmlFor="casa-apartamento">
									Casa/Apartamento
								</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="lote"
									value="Lote"
									checked={selectedCategories.includes(
										"Lote"
									)}
									onChange={handleCategoryChange}
								/>
								<label htmlFor="lote">Lote</label>
							</div>
						</div>
					</aside>
				</div>
				<div className="pl-3 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filteredItems?.map((item) => (
						<Card key={item.id} {...item} />
					))}
				</div>
			</div>
			<RealestateDetail />
		</>
	);
}

export default Home;
