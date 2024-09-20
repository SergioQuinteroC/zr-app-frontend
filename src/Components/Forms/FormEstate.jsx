import { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { supabase } from "../../supabaseClient";
import Cookies from "js-cookie";

const FormEstate = ({ closeModal, defaultValue }) => {
	const onDrop = useCallback((files) => {
		for (const img of files) {
			const file = new FileReader();

			file.onload = () => {
				setPreviews((prevPreviews) => [...prevPreviews, file.result]);
			};

			file.readAsDataURL(img);
		}
	}, []);

	const [error, setError] = useState(null);
	const [previews, setPreviews] = useState([]);
	const form = useRef(null);
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const [imagesUrl, setImagesUrl] = useState([]);
	const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
		useDropzone({
			accept: {
				"image/*": [],
			},
			onDrop,
		});

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData(form.current);
		const data = Object.fromEntries(formData);

		data.images = [...imagesUrl, ...(defaultValue?.images ?? [])];
		if (defaultValue) {
			const response = await handleRequest(
				`${import.meta.env.VITE_API_URL}/realestates/${
					defaultValue.id
				}`,
				"PATCH",
				data
			);
			if (response.ok) {
				setError(null);
				window.location.reload();
				closeModal();
			}
		} else {
			const response = await handleRequest(
				`${import.meta.env.VITE_API_URL}/realestates`,
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

	const handleSubmitImages = async (event) => {
		event.preventDefault();

		if (
			!acceptedFiles ||
			acceptedFiles.length === 0 ||
			previews.length === 0 ||
			!previews
		) {
			setError("Debes subir al menos una imagen");
			return;
		}

		try {
			setIsUploading(true);
			for (const file of acceptedFiles) {
				const { data, error } = await supabase.storage
					.from("images_realestate")
					.upload(file.name, file, { upsert: true });
				if (error) {
					throw error;
				}
				setImagesUrl((prevImagesUrl) => [
					...prevImagesUrl,
					`${
						import.meta.env.VITE_SUPABASE_URL
					}/storage/v1/object/public/images_realestate/${encodeURIComponent(
						data.path
					)}`,
				]);
			}
			setIsUploading(false);
			setIsUploaded(true);
		} catch (error) {
			setError("Ocurrió un error al subir las imágenes, sube de nuevo");
		}

		setError(null);
	};

	const onRemoveFileToUpload = (file) => () => {
		acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
		setPreviews((prevPreviews) =>
			prevPreviews.filter((preview) => preview !== file)
		);
	};

	const onRemoveFileUploaded = (file) => async () => {
		setImagesUrl((prevImagesUrl) =>
			prevImagesUrl.filter((img) => img !== file)
		);

		defaultValue.images = defaultValue.images.filter((img) => img !== file);

		const paths = file.split("/");
		const fileName = paths[paths.length - 1];

		const { error } = await supabase.storage
			.from("images_realestate")
			.remove(decodeURIComponent(fileName));

		if (error) {
			setError("Ocurrió un error al eliminar la imagen");
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
						Titulo
					</label>
					<input
						type="text"
						id="title"
						name="title"
						defaultValue={defaultValue?.title ?? ""}
						className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="price"
						className="font-medium text-gray-700"
					>
						Precio:
					</label>
					<input
						type="number"
						id="price"
						name="price"
						defaultValue={defaultValue?.price ?? ""}
						className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="category"
						className="font-medium text-gray-700"
					>
						Categoría:
					</label>
					<select
						id="category"
						name="category"
						defaultValue={defaultValue?.category ?? ""}
						className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
						required
					>
						<option value="Casa/Apartamento">
							Casa/Apartamento
						</option>
						<option value="Casa/Lote">Casa/Lote</option>
						<option value="Lote">Lote</option>
					</select>
				</div>
				<div>
					<label
						htmlFor="description"
						className="font-medium text-gray-700"
					>
						Descripción:
					</label>
					<textarea
						id="description"
						name="description"
						defaultValue={defaultValue?.description ?? ""}
						className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
						required
					></textarea>
				</div>
				<div>
					<label
						htmlFor="address"
						className="font-medium text-gray-700"
					>
						Dirección:
					</label>
					<input
						type="text"
						id="address"
						name="address"
						defaultValue={defaultValue?.address ?? ""}
						className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
						required
					/>
				</div>
				{defaultValue?.status && (
					<div>
						<label
							htmlFor="status"
							className="font-medium text-gray-700"
						>
							Status:
						</label>
						<select
							id="status"
							name="status"
							defaultValue={defaultValue?.status ?? ""}
							className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
							required
						>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
					</div>
				)}

				<div className="mt-1">
					<p className="font-medium text-gray-700">Imágenes:</p>
					<div
						{...getRootProps()}
						className="mt-1 p-1 border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center"
					>
						<input {...getInputProps()} />
						{isDragActive ? (
							<p className="mb-3 font-medium text-gray-700 flex flex-wrap justify-center">
								Suelta las imágenes aquí
							</p>
						) : (
							<p className="mb-3 font-medium text-gray-700 flex flex-wrap justify-center">
								Agarra los archivos y suéltalos aquí, o haz clic
								para seleccionar
							</p>
						)}
					</div>
					<button
						type="button"
						onClick={handleSubmitImages}
						className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
					>
						Subir imágenes
					</button>
					{isUploading && (
						<p className="mt-2 text-center">Subiendo imágenes...</p>
					)}
					{isUploaded && (
						<p className="mt-2 text-center text-green-500">
							Imágenes subidas correctamente
						</p>
					)}
				</div>
				<div className="mt-2">
					{previews.length > 0 && (
						<ul id="gallery" className="flex flex-1 flex-wrap -m-1">
							{previews.map((preview, index) => (
								<li
									key={index}
									className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 h-28"
								>
									<article className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
										<img
											className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
											src={preview}
											onLoad={() => {
												URL.revokeObjectURL(preview);
											}}
										/>

										<section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
											<button
												onClick={onRemoveFileToUpload(
													preview
												)}
												className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md"
												data-target="blob:https://tailwindcomponents.com/381b4102-7811-4ee3-92d7-8ca4c323421b"
											>
												<svg
													className="pointer-events-none fill-current w-4 h-4 ml-auto"
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
												>
													<path
														className="pointer-events-none"
														d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
													></path>
												</svg>
											</button>
										</section>
									</article>
								</li>
							))}
						</ul>
					)}
				</div>

				{defaultValue?.images.length > 0 && (
					<div className="mt-2">
						<p className="font-medium text-gray-700">
							Imágenes subidas
						</p>
						<ul id="gallery" className="flex flex-1 flex-wrap -m-1">
							{defaultValue.images.map((image, index) => (
								<li
									key={index}
									className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 h-28"
								>
									<article className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
										<img
											className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
											src={image}
										/>
										<section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
											<button
												onClick={onRemoveFileUploaded(
													image
												)}
												className="delete ml-auto focus:outline-none hover:bg-red-400 p-1 rounded-md"
												data-target="blob:https://tailwindcomponents.com/381b4102-7811-4ee3-92d7-8ca4c323421b"
											>
												<svg
													className="pointer-events-none fill-current w-4 h-4 ml-auto"
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
												>
													<path
														className="pointer-events-none"
														d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
													></path>
												</svg>
											</button>
										</section>
									</article>
								</li>
							))}
						</ul>
					</div>
				)}
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

export default FormEstate;
