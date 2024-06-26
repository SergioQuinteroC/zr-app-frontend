import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

const TableRow = ({
	id,
	title,
	description,
	price,
	status,
	address,
	category,
	onClick,
}) => {
	const onDelete = async () => {
		let confirmDelete = window.confirm(
			"¿Estás seguro de eliminar este registro?"
		);
		if (confirmDelete) {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/realestates/${id}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${Cookies.get("token")}`,
						},
					}
				);
				if (response.ok || response.status === 200) {
					window.location.reload();
				}
			} catch (error) {
				console.error(error);
			}
		}
	};
	return (
		<tr className="hover:bg-gray-100">
			<td className="p-4 text-sm font-normal">
				<NavLink to={`/detail/${id}`}>
					<p className="text-base font-semibold">{title}</p>
				</NavLink>
			</td>
			<td className="max-w-sm p-4 overflow-hidden text-base font-normal truncate xl:max-w-xs ">
				{description}
			</td>
			<td className="p-4 text-base overflow-hidden font-medium">
				{address}
			</td>
			<td className="p-4 text-base font-medium">
				${new Intl.NumberFormat().format(price)}
			</td>
			<td className="p-4 text-base font-medium">
				{category}
			</td>
			<td className="p-4 text-base font-medium">
				{status === "active" ? "Activa" : "Inactiva"}
			</td>

			<td className="p-4 space-x-2 whitespace-nowrap">
				<button
					onClick={onClick}
					type="button"
					className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-300"
				>
					<svg
						className="w-4 h-4 mr-2"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
						<path
							fillRule="evenodd"
							d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
							clipRule="evenodd"
						></path>
					</svg>
					Actualizar
				</button>
				<button
					onClick={onDelete}
					type="button"
					className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-red-700 rounded-lg text-white"
				>
					<svg
						className="w-4 h-4 mr-2"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clipRule="evenodd"
						></path>
					</svg>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default TableRow;
