import { useEffect, useState } from "react";
import TableRow from "../../Components/TableRow";
import Modal from "../../Components/Modal";
import Form from "../../Components/Forms";

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

	const handleSubmit = (value) => {
		console.log("Guardando", value);
		closeModal();
	};

	useEffect(() => {
		fetch(`http://localhost:3000/api/v1/realestates`)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}, []);

	return (
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
						className="border border-gray-300 bg-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5"
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
										<th scope="col" className="p-4">
											<div className="flex items-center">
												<input
													id="checkbox-all"
													aria-describedby="checkbox-1"
													type="checkbox"
													className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
												/>
												<label
													htmlFor="checkbox-all"
													className="sr-only"
												>
													checkbox
												</label>
											</div>
										</th>
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
											Status
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
											onClick={() =>
												openModal(item.title)
											}
										/>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={modalOpen}
				onClose={closeModal}
				onSubmit={handleSubmit}
				title={editingItem ? "Editar" : "Nuevo"}
			>
				<Form
					onSubmit={handleSubmit}
					onCancel={closeModal}
					defaultValue={editingItem}
				/>
			</Modal>
		</div>
	);
}

export default Dashboard;
