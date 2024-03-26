import { useState } from "react";

const Form = ({ onSubmit, onCancel, defaultValue }) => {
	const [value, setValue] = useState(defaultValue);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit = () => {
		onSubmit(value);
	};

	return (
		<div>
			<input type="text" value={value} onChange={handleChange} />
			<button onClick={handleSubmit}>Guardar</button>
			<button onClick={onCancel}>Cancelar</button>
		</div>
	);
};

export default Form;
