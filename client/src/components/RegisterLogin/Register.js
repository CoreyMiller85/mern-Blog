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
	});

	const isFormValid = (email, password, name, lastName) => {
		if (email && password && name && lastName) {
			return true;
		}
		return false;
	};

	const handleSubmitForm = (event) => {
		event.preventDefault();

		let dataToSubmit = {
			name: formData.name,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password,
		};
		if (
			isFormValid(
				formData.email,
				formData.password,
				formData.name,
				formData.lastName
			)
		) {
			setErrors({ errors: [] });
			props.dispatch(registerUser(dataToSubmit)).then((response) => {
				console.log(response);
				if (response.payload.success) {
					navigate("/");
				} else {
					const newState = ["Something Went wrong."];
					setErrors({ errors: newState });
				}
			});
		} else {
			const newState = [
				"Please enter a valid first name, last name, email address and password",
			];
			setErrors({ errors: newState });
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
						{errors.errors.length > 0 && <div>{displayErrors(errors)}</div>}
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
