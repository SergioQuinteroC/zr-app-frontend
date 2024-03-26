const Modal = ({ isOpen, onClose, onSubmit, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="modal">
			<div className="modal-content">
				<span className="close" onClick={onClose}>
					&times;
				</span>
				<h2>{title}</h2>
				{children}
				<button onClick={onSubmit}>Guardar</button>
			</div>
		</div>
	);
};

export default Modal;
