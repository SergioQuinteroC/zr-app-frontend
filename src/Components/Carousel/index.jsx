import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Carousel = ({ slides }) => {
	const [current, setCurrent] = useState(0);

	const previousSlide = () => {
		if (current === 0) setCurrent(slides.length - 1);
		else setCurrent(current - 1);
	};

	const nextSlide = () => {
		if (current === slides.length - 1) setCurrent(0);
		else setCurrent(current + 1);
	};

	return (
		<div className="overflow-hidden relative rounded-2xl h-full">
			<div
				className={`flex transition ease-out duration-40`}
				style={{
					transform: `translateX(-${current * 100}%)`,
				}}
			>
				{slides?.map((sr) => {
					return <img className="object-cover h-full w-full" key={sr} src={sr} />;
				})}
			</div>

			<div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
				<button onClick={previousSlide}>
					<ChevronLeftIcon className="h-12 w-12" />
				</button>
				<button onClick={nextSlide}>
					<ChevronRightIcon className="h-12 w-12" />
				</button>
			</div>
			<div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
				{slides.map((s, i) => {
					return (
						<div
							onClick={() => {
								setCurrent(i);
							}}
							key={"circle" + i}
							className={`rounded-full w-5 h-5 cursor-pointer  ${
								i == current ? "bg-white" : "bg-gray-500"
							}`}
						></div>
					);
				})}
			</div>
		</div>
	);
};

export default Carousel;
