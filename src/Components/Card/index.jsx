import { useContext } from "react";
import { ZRAppContext } from "../../Context";

const Card = (data) => {
	const context = useContext(ZRAppContext);

	console.log(data.data.images[0])
	return (
		//    card wrapper
		<div
			className="overflow-hidden rounded-md bg-white shadow-2xl"
			onClick={() => context.openRealestateDetail()}
		>
			{/* image container  */}
			<div className={`h-64 w-full bg-[url('${data.data.images[0]}')] bg-cover bg-center`}></div>

			{/* content container */}
			<div className="flex flex-col gap-2 p-4">
				<div>
					<p className="text-xl font-bold text-gray-900">
						{data.data.title}
					</p>
					<p className="text-sm text-gray-700">
						{data.data.description}
					</p>
					<p className="text-sm text-gray-500">
						{data.data.address}
					</p>
				</div>
			</div>

			{/* footer container */}
			<div className="flex justify-between border-t border-t-gray-100 bg-gray-50 p-3">
				<div className="flex items-center">
					<p className="text-xl font-bold text-gray-900">
						${data.data.price}
					</p>
					{/* <p className="text-sm text-gray-500"></p> */}
				</div>
			</div>
		</div>
	);
};

export default Card;
