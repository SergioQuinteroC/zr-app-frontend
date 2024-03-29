import { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { supabase } from "../../supabaseClient";

const FormEstate = ({ closeModal, defaultValue }) => {
	const onDrop = (files) => {
		for (const img of files) {
			const file = new FileReader();

			file.onload = () => {
				setPreviews((prevPreviews) => [...prevPreviews, file.result]);
			};

			file.readAsDataURL(img);
		}
	};

	const [error, setError] = useState(null);
	const [previews, setPreviews] = useState([]);
	const form = useRef(null);
	const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
		useDropzone({
			accept: {
				"image/*": [],
			},
			onDrop,
		});
	const [isUploading, setIsUploading] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(form.current);
		const data = Object.fromEntries(formData);
		delete data.images;
		console.log(data);
		// closeModal();
	};

	const handleSubmitImages = async (event) => {
		event.preventDefault();

		if (!acceptedFiles) {
			setError("Debes seleccionar al menos una imagen");
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
				// data.fullPath https://ouzpoiuobxlglxqqcuoq.supabase.co/storage/v1/object/public/
			}
			setIsUploading(false);
		} catch (error) {
			console.error(error);
			setError("Ocurrió un error al subir las imágenes");
		}

		setError(null);
	};

	return (
		<>
			{error && (
				<p className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
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
				</div>
				<div className="mt-2">
					{previews.length > 0 && (
						<ul id="gallery" className="flex flex-1 flex-wrap -m-1">
							{previews.map((preview, index) => (
								<li
									key={index}
									className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 h-28"
								>
									<img
										className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
										src={preview}
										onLoad={() => {
											URL.revokeObjectURL(preview);
										}}
									/>
								</li>
							))}
						</ul>
					)}
				</div>

				{defaultValue?.images && (
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
									<img
										className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
										src={image}
									/>
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
