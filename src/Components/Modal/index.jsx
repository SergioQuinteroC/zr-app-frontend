import { XMarkIcon } from "@heroicons/react/24/solid";

const Modal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto ">
			<div className="items-center justify-center  pt-4 px-4 pb-20 text-center block">
				<div className="transition-opacity absolute inset-0 bg-gray-500 opacity-75" />
				<div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[40rem] sm:w-full bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div className="sm:flex sm:items-start">
						<div className="mt-3 w-full sm:mt-0 sm:ml-4 sm:text-left">
							<div className="bg-gray-100 w-full  p-4 rounded-xl ">
								<div className="flex justify-between items-center py-3">
									<p className="text-xl font-bold text-gray-800">
										{title}
									</p>

									<div
										onClick={onClose}
										className="bg-gray-300 hover:bg-red-400 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
									>
										<XMarkIcon className="h-6 w-6 text-black"></XMarkIcon>
									</div>
								</div>
							</div>
							<div className="my-4">{children}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
