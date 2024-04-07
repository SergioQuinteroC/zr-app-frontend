import { useContext } from "react";
import { ZRAppContext } from "../../Context";

const Card = ({ id, title, description, price, images, address, category }) => {
	const context = useContext(ZRAppContext);

	// const pesos = new Intl.NumberFormat('es-ES', {
	// 	style: 'currency',
	// 	currency: 'COP'
	// })

	const showEstate = () => {
		context.openRealestateDetail();
		context.setEstateToShow({
			title,
			price,
			description,
			images,
			address,
			category,
		});
	};

	return (
		<div
			className="rounded-md bg-white shadow-2xl cursor-pointer"
			onClick={() => showEstate()}
		>
			<figure className="relative w-full">
				<img src={images[0]} alt={title} />
			</figure>
			<div className="flex flex-col gap-2 p-4">
				<div>
					<div className="flex justify-between">
						<p className="text-xl font-bold text-gray-900">
							{title}
						</p>
						<p className="text-sm">{category}</p>
					</div>
					<p className="text-sm text-gray-700">{description}</p>
					<p className="text-sm text-gray-500">{address}</p>
				</div>
			</div>
			<div className="flex justify-between border-t border-t-gray-100 bg-gray-50 p-3">
				<div className="flex items-center">
					<p className="text-xl font-bold text-gray-900">
						${new Intl.NumberFormat().format(price)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
