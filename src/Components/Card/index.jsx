import { useContext } from "react";
import { ZRAppContext } from "../../Context";

const Card = ({ id, title, description, price, images, address }) => {
	const context = useContext(ZRAppContext);

	const showEstate = () => {
		context.openRealestateDetail();
		context.setEstateToShow({ title, price, description, images, address });
	};

	return (
		//    card wrapper
		<div
			className="overflow-hidden rounded-md bg-white shadow-2xl"
			onClick={() => showEstate()}
		>
			{/* image container  */}
			<div
				className={`h-64 w-full bg-[url('${images[0]}')] bg-cover bg-center`}
			></div>

			{/* content container */}
			<div className="flex flex-col gap-2 p-4">
				<div>
					<p className="text-xl font-bold text-gray-900">{title}</p>
					<p className="text-sm text-gray-700">{description}</p>
					<p className="text-sm text-gray-500">{address}</p>
				</div>
			</div>

			{/* footer container */}
			<div className="flex justify-between border-t border-t-gray-100 bg-gray-50 p-3">
				<div className="flex items-center">
					<p className="text-xl font-bold text-gray-900">
						${price}
					</p>
					{/* <p className="text-sm text-gray-500"></p> */}
				</div>
			</div>
		</div>
	);
};

export default Card;
