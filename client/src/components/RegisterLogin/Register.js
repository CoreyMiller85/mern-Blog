import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-materialize";
import { registerUser } from "../../actions/user_actions";

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const Register = (props) => {
	const [errors, setErrors] = useState({ errors: [] });
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		lastName: "",
		email: "",
		password: "",
		passwordConfrmation: "",
	});

	console.log(errors);

	const isFormValid = () => {
		setErrors({ errors: [] });
		let error;

		if (isFormEmpty(formData)) {
			error = { message: "You must fill in all fields" };
			setErrors([...errors, error]);
			return false;
		} else if (!isPasswordValid(formData)) {
			error = { message: "Password is invalid" };
			setErrors([...errors, error]);
			return false;
		}
		return true;
	};

	const isPasswordValid = ({ password, passwordConfrmation }) => {
		if (password.length < 6 || passwordConfrmation < 6) {
			return false;
		} else if (password !== passwordConfrmation) {
			return false;
		} else {
			return true;
		}
	};

	const isFormEmpty = ({
		name,
		lastName,
		email,
		password,
		passwordConfrmation,
	}) => {
		return (
			!name.length ||
			!lastName.length ||
			!email.length ||
			!password.length ||
			!passwordConfrmation.length
		);
	};

	const handleSubmitForm = (event) => {
		event.preventDefault();

		let dataToSubmit = {
			name: formData.name,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password,
		};
		if (isFormValid()) {
			setErrors({ errors: [] });
			props
				.dispatch(registerUser(dataToSubmit))
				.then((response) => {
					if (response.payload.success) {
						navigate("/login");
					}
				})
				.catch((err) => setErrors({ errors: [err] }));
		}
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const displayErrors = (errors) => {
		return errors.errors.map((error, i) => {
			return <p key={i}>{error}</p>;
		});
	};

	return (
		<div className="container">
			<h2>Register Account</h2>
			<div className="row">
				<form className="col s12" onSubmit={(event) => handleSubmitForm(event)}>
					<div className="row">
						<div className="input-field col s12">
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={(event) => handleChange(event)}
								id="name"
								className="validate"
							/>
							<label htmlFor="name">First Name</label>
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
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={(event) => handleChange(event)}
								id="lastName"
								className="validate"
							/>
							<label htmlFor="lastName">Last Name</label>
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
								type="email"
								name="email"
								value={formData.email}
								onChange={(event) => handleChange(event)}
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
								value={formData.password}
								onChange={(event) => handleChange(event)}
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
					<div className="row">
						<div className="input-field col s12">
							<input
								type="password"
								name="passwordConfrmation"
								value={formData.passwordConfrmation}
								onChange={(event) => handleChange(event)}
								id="passwordConfrmation"
								className="validate"
							/>
							<label htmlFor="passwordConfrmation">Confirm Password</label>
							<span
								className="helper-text"
								data-error="wrong"
								data-success="right"
							/>
						</div>
					</div>
					{errors.errors.length > 0 && <div>{displayErrors(errors)}</div>}
					<div className="row">
						<div className="row">
							<div className="col s12">
								<Button
									className="btn wave-effect red lighten-2"
									type="submit"
									name="action"
									onClick={(event) => handleSubmitForm(event)}
									waves="light"
								>
									Create Account
								</Button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default connect(mapStateToProps)(Register);
