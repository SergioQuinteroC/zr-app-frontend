import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { ZRAppContext } from "../../Context";
import Carousel from "../Carousel";
import "./styles.css";

const RealestateDetail = () => {
	const { isDetailOpen, closeRealestateDetail, estateToShow } =
		useContext(ZRAppContext);

	return (
		<aside
			className={`${
				isDetailOpen ? "flex" : "hidden"
			} product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
		>
			<div className="flex justify-between items-center p-6">
				<h1 className="font-medium text-2xl">Detalles</h1>
				<div onClick={() => closeRealestateDetail()}>
					<XMarkIcon className="h-6 w-6 text-black"></XMarkIcon>
				</div>
			</div>
			<div className="w-[90%] mx-auto">

			<Carousel slides={estateToShow.images}></Carousel>
			</div>
			<p className="flex flex-col p-6">
				<span className="font-medium text-2xl mb-2">
					{estateToShow.price}
				</span>
				<span className="font-medium text-md">
					{estateToShow.title}
				</span>
				<span className="font-light text-sm">
					{estateToShow.description}
				</span>
			</p>
		</aside>
	);
};

export default RealestateDetail;
