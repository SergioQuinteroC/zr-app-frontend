import { useContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ZRAppContext } from "../../Context";

function Login() {
	const { isLogged, setIsLogged } = useContext(ZRAppContext);

	const [error, setError] = useState(null);
	const form = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(form.current);
		const data = Object.fromEntries(formData);
		try {
			const response = await fetch(
				"http://localhost:3000/api/v1/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);
			if (response.status === 401) {
				setError("Usuario o contraseña incorrectos");
			}
			if (response.ok || response.status === 200) {
				setError(null);
				const { token } = await response.json();
				Cookies.set("token", token, { expires: 10 });
				setIsLogged(true);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex min-h-full w-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src="/realestate.svg"
					alt="ZR App Logo"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
					Inicia Sesión
				</h2>
			</div>

			{error && (
				<p className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
					{error}
				</p>
			)}

			{isLogged && <Navigate to="/dashboard" replace={true} />}

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" ref={form}>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Contraseña
							</label>
							{/* <div className="text-sm">
								<a
									href="#"
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									Forgot password?
								</a>
							</div> */}
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-blue-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={handleSubmit}
						>
							Entrar!
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
