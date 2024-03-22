import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Carousel } from "@material-tailwind/react";

import { ZRAppContext } from "../../Context";
import "./styles.css";

const RealestateDetail = () => {
	const { isDetailOpen, closeRealestateDetail, estateToShow } =
		useContext(ZRAppContext);

	console.log(estateToShow.images);
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
			{/* {estateToShow.images?.map((img) => (
					<img key={img} className="h-full w-full object-cover" />
				))} */}

			<Carousel
				className="rounded-xl"
				navigation={({ setActiveIndex, activeIndex, length }) => (
					<div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
						{new Array(length).fill("").map((_, i) => (
							<span
								key={i}
								className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
									activeIndex === i
										? "w-8 bg-white"
										: "w-4 bg-white/50"
								}`}
								onClick={() => setActiveIndex(i)}
							/>
						))}
					</div>
				)}
			>
				{estateToShow.images?.map((img) => (
					<img
						key={img}
						className="h-full w-full object-cover"
						src={img}
					/>
				))}
			</Carousel>
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
