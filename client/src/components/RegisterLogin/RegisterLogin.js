import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-materialize";
import { loginUser } from "../../actions/user_actions";

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const RegisterLogin = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ errors: [] });
	const navigate = useNavigate();

	const isFormValid = (email, password) => {
		if (email && password) {
			return true;
		}
		return false;
	};

	const handleSubmitForm = (event) => {
		event.preventDefault();
		let dataToSubmit = {
			email,
			password,
		};
		if (isFormValid(email, password)) {
			setErrors({ errors: [] });
			props.dispatch(loginUser(dataToSubmit)).then((response) => {
				if (response.payload.success) {
					navigate("/");
				} else {
					const newState = ["Incorrect Username or Password."];
					setErrors({ errors: newState });
				}
			});
		} else {
			const newState = ["Please enter a valid email address and password"];
			setErrors({ errors: newState });
		}
	};

	const handleEmailChange = (event) => {
		const value = event.target.value;
		setEmail(value);
	};

	const handlePasswordChange = (event) => {
		const value = event.target.value;
		setPassword(value);
	};

	const displayErrors = (errors) => {
		return errors.errors.map((error, i) => {
			return <p key={i}>{error}</p>;
		});
	};

	return (
		<div className="container">
			<h2>Log In</h2>
			<div className="row">
				<form className="col s12" onSubmit={(event) => handleSubmitForm(event)}>
					<div className="row">
						<div className="input-field col s12">
							<input
								type="email"
								name="email"
								value={email}
								onChange={(event) => handleEmailChange(event)}
								id="email"
								className="validate"
							/>
							<label htmlFor="email">Email</label>
							<span
								className="helper-text"
								data-error="wrong"
								data-success="right"
							/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								type="password"
								name="password"
								value={password}
								onChange={(event) => handlePasswordChange(event)}
								id="password"
								className="validate"
							/>
							<label htmlFor="password">Password</label>
							<span
								className="helper-text"
								data-error="wrong"
								data-success="right"
							/>
						</div>
					</div>
					{errors.errors.length > 0 && <div>{displayErrors(errors)}</div>}
					<div className="row">
						<div className="col s6">
							<Button
								className="btn wave-effect red lighten-2"
								type="submit"
								name="action"
								onClick={(event) => handleSubmitForm(event)}
								waves="light"
							>
								Login
							</Button>
							<Link to={"/register"}>
								<Button
									className="btn wave-effect red lighten-2"
									type="submit"
									name="action"
									waves="light"
								>
									Register
								</Button>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default connect(mapStateToProps)(RegisterLogin);
