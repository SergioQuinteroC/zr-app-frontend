import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { ZRAppContext } from "../../Context";
import Carousel from "../Carousel";

const RealestateDetail = () => {
	const { isDetailOpen, closeRealestateDetail, estateToShow } =
		useContext(ZRAppContext);

	const message = `Hola, estoy interesado en tu propiedad ${estateToShow.title}`;
	const URI = `https://wa.me/${
		import.meta.env.VITE_NUMBER_CEL
	}?text=${encodeURIComponent(message)}`;

	return (
		<aside
			className={`${
				isDetailOpen ? "flex overflow-auto" : "hidden"
			} 2xl:w-[700px] xl:w-[650px] md:w-[600px] w-full h-[80vh] top-16 flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
		>
			<div className="flex justify-between items-center p-6">
				<h1 className="font-medium xl:text-2xl">Detalles</h1>
				<div
					className="cursor-pointer"
					onClick={() => closeRealestateDetail()}
				>
					<XMarkIcon className="h-6 w-6 text-black"></XMarkIcon>
				</div>
			</div>
			<div className="flex w-[90%] mx-auto md:h-[60%] xl:h-[60%] 2xl:h-[60%] sm:h-auto ">
				<Carousel slides={estateToShow.images}></Carousel>
			</div>
			<div className="flex flex-col p-4">
				<span className="font-medium text-2xl mb-2">
					${new Intl.NumberFormat().format(estateToShow.price)}
				</span>
				<div className="flex justify-between">
					<span className="font-medium text-2xl">
						{estateToShow.title}
					</span>
					<span className="text-md mr-10">
						{estateToShow.category}
					</span>
				</div>
				<span className="font-light text-sm">
					{estateToShow.description}
				</span>
				<span className="font-light text-sm">
					{estateToShow.address}
				</span>
			</div>
			<div className="sharing-buttons flex flex-wrap justify-center">
				<a
					className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-5 pl-5 pr-7 text-lg rounded-lg text-white border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700"
					target="_blank"
					rel="noopener"
					href={URI}
					aria-label="Mas informacion Whatsapp"
					draggable="false"
				>
					<svg
						aria-hidden="true"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						className="w-8 h-8"
					>
						<title>Whatsapp</title>
						<path d="M413 97A222 222 0 0 0 64 365L31 480l118-31a224 224 0 0 0 330-195c0-59-25-115-67-157zM256 439c-33 0-66-9-94-26l-7-4-70 18 19-68-4-7a185 185 0 0 1 287-229c34 36 56 82 55 131 1 102-84 185-186 185zm101-138c-5-3-33-17-38-18-5-2-9-3-12 2l-18 22c-3 4-6 4-12 2-32-17-54-30-75-66-6-10 5-10 16-31 2-4 1-7-1-10l-17-41c-4-10-9-9-12-9h-11c-4 0-9 1-15 7-5 5-19 19-19 46s20 54 23 57c2 4 39 60 94 84 36 15 49 17 67 14 11-2 33-14 37-27s5-24 4-26c-2-2-5-4-11-6z"></path>
					</svg>
					<span className="ml-4">Mas información WhatsApp</span>
				</a>
			</div>
		</aside>
	);
};

export default RealestateDetail;
