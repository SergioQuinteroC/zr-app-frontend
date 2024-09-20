import { useEffect, useState } from "react";
import TableRow from "../../Components/TableRow";
import Modal from "../../Components/Modal";
import FormEstate from "../../Components/Forms/FormEstate";

function Dashboard() {
	const [items, setItems] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState(null);

	const openModal = (item) => {
		setEditingItem(item);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setEditingItem(null);
	};

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/realestates`)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}, []);

	return (
		<div className="flex flex-col items-center mt-5 ml-10 mr-10">
			<div>
				<div className="w-full mb-1">
					<div className="mb-4">
						<h1 className="text-xl font-semibold sm:text-2xl">
							Todos los inmuebles
						</h1>
					</div>
					<div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100">
						<div className="flex items-center mb-4 sm:mb-0">
							<form className="sm:pr-3">
								<label
									htmlFor="products-search"
									className="sr-only"
								>
									Search
								</label>
								<div className="relative w-48 mt-1 sm:w-64 xl:w-96">
									<input
										type="text"
										name="email"
										id="products-search"
										className="border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
										placeholder="Buscar por titulo"
									/>
								</div>
							</form>
						</div>
						<button
							onClick={() => openModal(null)}
							className="border border-gray-300 bg-customGray-light text-white font-medium rounded-lg text-sm px-5 py-2.5"
							type="button"
						>
							Añadir nuevo
						</button>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="overflow-x-auto">
						<div className="inline-block min-w-full align-middle">
							<div className="overflow-hidden shadow">
								<table className="min-w-full divide-y divide-gray-200 table-fixed">
									<thead className="bg-gray-100">
										<tr>
											<th
												scope="col"
												className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											>
												Titulo
											</th>

											<th
												scope="col"
												className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											>
												Descripción
											</th>
											<th
												scope="col"
												className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											>
												Dirección
											</th>
											<th
												scope="col"
												className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											>
												Precio
											</th>
											<th
												scope="col"
												className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											>
												Categoría
											</th>
											<th
												scope="col"
												className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											>
												Estatus
											</th>
											<th
												scope="col"
												className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
											>
												Acciones
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{items.map((item) => (
											<TableRow
												key={item.id}
												{...item}
												onClick={() => openModal(item)}
											/>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={modalOpen}
				onClose={closeModal}
				title={editingItem ? "Editar" : "Nuevo"}
			>
				<FormEstate
					closeModal={closeModal}
					defaultValue={editingItem}
				/>
			</Modal>
		</div>
	);
}

export default Dashboard;
