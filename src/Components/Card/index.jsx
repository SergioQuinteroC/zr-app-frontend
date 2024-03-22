const Card = () => {
	return (
		//    card wrapper
		<div className="overflow-hidden rounded-md bg-white shadow-2xl">
			{/* image container  */}
			<div className="h-64 w-full bg-[url('https://tinyurl.com/fz46ras3')] bg-cover bg-center"></div>

			{/* content container */}
			<div className="flex flex-col gap-2 p-4">
				<div>
					<p className="text-xl font-bold text-gray-900">
						Casa unifamiliar
					</p>
					<p className="text-sm text-gray-700">
						Se vende casa unifamiliar de 2 y 3er piso, 1000mts
						aproximandamente, al frente de la universidad de medellin doña maria
					</p>
					<p className="text-sm text-gray-500">Medellin, Doña maria</p>
				</div>
			</div>

			{/* footer container */}
			<div className="flex justify-between border-t border-t-gray-100 bg-gray-50 p-3">
				<div className="flex items-center">
					<p className="text-xl font-bold text-gray-900">$130000000</p>
					<p className="text-sm text-gray-500">negociable</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
