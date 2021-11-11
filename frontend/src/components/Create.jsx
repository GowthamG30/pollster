import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Error from "./Error";
import Navbar from "./Navbar";
import Success from "./Success";

// This page helps the user to create polls, which contains questions and options.

const Create = () => {
	const [error, setError] = useState([]);
	const [options, setOptions] = useState([""]);
	const [question, setQuestion] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [success, setSuccess] = useState("");

	const handleOptions = (index, event) => {
		const newOptions = [...options];
		newOptions[index] = event.target.value;
		setOptions(newOptions);
	};

	const handleQuestion = (event) => {
		setQuestion(event.target.value);
	};

	const addOptions = () => {
		setOptions([...options, ""]);
	};

	const removeOptions = (index) => {
		const newOptions = [...options];
		newOptions.splice(index, 1);
		setOptions(newOptions);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		let errorBuffer = [];

		// Validate Inputs
		if(!question)
			errorBuffer.push("Question should not be left empty");
		
		if(options.includes(""))
			errorBuffer.push("No option should be left empty");

		if(errorBuffer.length) {
			setError(errorBuffer);
			console.log("Error in validation" + errorBuffer);
			return;
		}

		const params = JSON.stringify({
			question: question,
			options: options
		});

		// Send access token through authorization header
		let requestOptions = {headers: {}};
		requestOptions.headers["content-type"] = "application/json";
		
		let accessToken = localStorage.getItem("accessToken");
		if(accessToken) {
			requestOptions.headers["authorization"] = `Bearer ${accessToken}`;
		}
		JSON.stringify(requestOptions);
		
		// Pass poll data to the server
		axios
			.post("/api/create", params, requestOptions)
			.then(res => {
				setSuccess("Poll created!");
				setTimeout(() => {
					setRedirect(true);
				}, 750);
			})
			.catch(err => {
				if(err.response.status === 403) {
					alert("Session expired");
					window.location.reload();
				}
				else if(err.response.status === 500) {
					alert("Internal server error");
				}
				else {
					alert("Something went wrong");
				}
			});
	};

	if(redirect) {
		return <Redirect to="/polls"/>;
	}

	return (
		<>
			<Navbar />
			<div className="container">
				<form className="create-form" onSubmit={handleSubmit}>
					<p className="create-label">Question:</p>
					<input className="text-input" type="text" value={question || ""} placeholder="Enter question..." autoComplete="off" onChange={event => handleQuestion(event)} />
					
					<p className="create-label">Options:</p>
					{options.map((element, index) => (
						<div className="option" key={index}>
							<input className="text-input" type="text" value={element || ""} placeholder={"Enter option "+(index+1)} autoComplete="off" onChange={event => handleOptions(index, event)} />
							{
								index ? 
									<button type="button" className="btn remove" onClick={() => removeOptions(index)}>
										<span className="material-icons">delete_outline</span>
									</button> 
								: null
							}
						</div>
					))}

					<button className="btn btn-orange add" type="button" onClick={() => addOptions()}>Add Option</button><br/>
					<Error error={error}/>
					<button className="btn btn-orange submit" type="submit">Create</button>
					<Success success={success}/>
				</form>
			</div>
		</>
	);
};

export default Create;
