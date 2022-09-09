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
		if (location.state) {
			setValues({ ...values, room: location.state.room });
		}
	}, [location]);

	const handleJoinSuccess = (data) => {
		console.log(data);
		navigate("/board/" + data.room, { state: data.players });
	};

	useEffect(() => {
		socket.on("joinSuccess", (data) => handleJoinSuccess(data));

		return () => {
			socket.off("joinSuccess", (data) => handleJoinSuccess(data));
		};
	}, [socket]);

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const joinRoom = (e) => {
		socket.emit("joinRoom", { ...values }, (error) => alert(error));
	};

	const createRoom = (e) => {
		socket.emit("createRoom", {username: values.username}, (error) => alert(error));
	}

	return (
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
			<Button
				size="large"
				variant="contained"
				color="primary"
				style={{ marginBottom: "2em" }}
				onClick={createRoom}
			>
				Create Room
			</Button>
			<TextField
				variant="outlined"
				label="Room"
				name="room"
				style={{ marginBottom: "2em" }}
				onChange={handleChange}
				value={values.room}
			/>
			<Button
				size="large"
				variant="contained"
				color="primary"
				onClick={joinRoom}
			>
				Join
			</Button>
		</Grid>
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
