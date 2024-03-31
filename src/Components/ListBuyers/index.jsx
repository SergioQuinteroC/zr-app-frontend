import { useState } from "react";
import Modal from "../Modal";
import BuyerRow from "../TableRow/BuyerRow";
import FormBuyers from "../Forms/FormBuyer";

const ListBuyers = ({ buyers, idRealEstate }) => {
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

	return (
		<div>
			<div className="w-full mb-1">
				<div className="mb-4">
					<h1 className="text-xl font-semibold sm:text-2xl">
						Todos los compradores
					</h1>
				</div>
				<div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100">
					<button
						onClick={() => openModal(null)}
						className="border border-gray-300 bg-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5"
						type="button"
					>
						Añadir nuevo
					</button>
				</div>
			</div>
			<div className="py-4 flex flex-col">
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
											Nombre
										</th>

										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
										>
											Apellido
										</th>
										<th
											scope="col"
											className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
										>
											Celular
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
									{buyers?.map((buyer) => (
										<BuyerRow
											key={buyer.id}
											{...buyer}
											onClick={() => openModal(buyer)}
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
				title={editingItem ? "Editar" : "Nuevo"}
			>
				<FormBuyers
					idRealEstate={idRealEstate}
					closeModal={closeModal}
					defaultValue={editingItem}
				/>
			</Modal>
		</div>
	);
};

export default ListBuyers;
