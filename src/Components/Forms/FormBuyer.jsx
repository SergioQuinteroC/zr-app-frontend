import { useRef, useState, useCallback } from "react";

import Cookies from "js-cookie";

const FormBuyers = ({ closeModal, defaultValue, idRealEstate }) => {
	const [error, setError] = useState(null);
	const form = useRef(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData(form.current);
		const data = Object.fromEntries(formData);
		if (defaultValue) {
			const response = await handleRequest(
				`${import.meta.env.VITE_API_URL}/buyers/${defaultValue.id}`,
				"PATCH",
				data
			);
			if (response.ok) {
				setError(null);
				window.location.reload();
				closeModal();
			}
		} else {
			data.idRealEstate = idRealEstate;
			const response = await handleRequest(
				`${import.meta.env.VITE_API_URL}/buyers`,
				"POST",
				data
			);
			if (response.ok) {
				setError(null);
				window.location.reload();
				closeModal();
			}
		}
	};

	const handleRequest = async (url, method, data) => {
		try {
			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}

			return response;
		} catch (error) {
			console.error(error);
			throw new Error("An error occurred while processing the request");
		}
	};

	return (
		<>
			{error && (
				<p className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center text-red">
					{error}
				</p>
			)}

			<form ref={form}>
				<div>
					<label
						htmlFor="title"
						className="font-medium text-gray-700"
					>
						Nombre
					</label>
					<input
						type="text"
						id="name"
						name="name"
						defaultValue={defaultValue?.name ?? ""}
						className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="description"
						className="font-medium text-gray-700"
					>
						Apellido:
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						defaultValue={defaultValue?.lastName ?? ""}
						className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="phone"
						className="font-medium text-gray-700"
					>
						Celular:
					</label>
					<input
						type="text"
						id="phone"
						name="phone"
						defaultValue={defaultValue?.phone ?? ""}
						className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
						required
					/>
				</div>

				<button
					onClick={handleSubmit}
					className="bg-indigo-500 mt-5 text-white rounded text-sm py-3 p-10 mr-2 hover:bg-indigo-600"
				>
					Guardar
				</button>
			</form>
		</>
	);
};

export default FormBuyers;
