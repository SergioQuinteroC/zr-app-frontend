import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { ZRAppContext } from "../../Context";
import "./styles.css";

const RealestateDetail = () => {
	const context = useContext(ZRAppContext);
	console.log(context.estateToShow);
	return (
		<aside
			className={`${
				context.isDetailOpen ? "flex" : "hidden"
			} product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
		>
			<div className="flex justify-between items-center p-6">
				<h2 className="font-medium text-xl">Detalles</h2>
				<div onClick={() => context.closeRealestateDetail()}>
					<XMarkIcon className="h-6 w-6 text-black"></XMarkIcon>
				</div>
			</div>
			<figure className="px-6">
				<img
					className="w-full h-full rounded-lg"
					src={context.estateToShow.images[0]}
					alt={context.estateToShow.title}
				/>
			</figure>
			<p className="flex flex-col p-6">
				<span className="font-medium text-2xl mb-2">
					${context.estateToShow.price}
				</span>
				<span className="font-medium text-md">
					${context.estateToShow.title}
				</span>
				<span className="font-light text-sm">
					${context.estateToShow.description}
				</span>
			</p>
		</aside>
	);
};

export default RealestateDetail;
