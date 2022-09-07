import React, { useState, useEffect, useContext } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";

const initialValues = {
	username: "",
	room: "",
};

const Form = () => {
	const [values, setValues] = useState(initialValues);
	const socket = useContext(SocketContext);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.state.room) {
			setValues({ ...values, room: location.state.room });
		}
	}, [location]);

	const handleJoinSuccess = (data) => {
		navigate("/board/" + values.room, { state: data });
	};

	useEffect(() => {
		socket.on("joinSuccess", (data) => handleJoinSuccess(data));

		return () => {
			socket.off("joinSuccess", handleJoinSuccess);
		};
	}, [socket, values]);

	const handleChange = (e) => {
		const value = e.target.value;
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const joinRoom = (e) => {
		e.preventDefault();
		socket.emit("joinRoom", { ...values }, (error) => alert(error));
	};

	return (
		<form onSubmit={joinRoom}>
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="center"
			>
				<TextField
					variant="outlined"
					name="username"
					label="Username"
					style={{ marginBottom: "2em" }}
					onChange={handleChange}
					value={values.username}
				/>
				<TextField
					variant="outlined"
					label="Room"
					name="room"
					style={{ marginBottom: "2em" }}
					onChange={handleChange}
					value={values.room}
				/>
				<Button
					type="submit"
					size="large"
					variant="contained"
					color="primary"
				>
					Join
				</Button>
			</Grid>
		</form>
	);
};

const Join = ({ socket }) => {
	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			direction="column"
			style={{ minHeight: "100vh" }}
			spacing={5}
		>
			<Grid item>
				<Typography variant="h5" color="primary">
					Math Bomb Party!
				</Typography>
			</Grid>
			<Grid item style={{ border: "0.2px solid gray" }}>
				<Form />
			</Grid>
		</Grid>
	);
};

export default Join;
