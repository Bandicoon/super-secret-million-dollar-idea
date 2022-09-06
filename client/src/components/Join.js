import React, { useState, useEffect, useContext } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { SocketContext } from '../context/socket';

const initialValues = {
	username: "",
	roomId: "",
};

const Form = () => {
	const [values, setValues] = useState(initialValues);
    const socket = useContext(SocketContext);

    const handleJoinSuccess = () => {
        
    }

	useEffect(() => {
        socket.on('joinSuccess', handleJoinSuccess);
        
		return () => {
		    socket.off('joinSuccess', handleJoinSuccess);
		};
	}, [socket]);

	const handleChange = (e) => {
		const value = e.target.value;
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

    const joinRoom = () => {

    }

	return (
    <form onSubmit={joinRoom}>
		<Grid container direction="column" alignItems="center" justify="center">
			<TextField
				variant="outlined"
				name="username"
				label="Username"
				fullwidth
				style={{ marginBottom: "2em" }}
				onChange={handleChange}
				value={values.username}
                />
			<TextField
				variant="outlined"
				label="Room ID"
				name="roomId"
				fullwidth
				style={{ marginBottom: "2em" }}
				onChange={handleChange}
				value={values.roomId}
                />
			<Button size="large" variant="contained" color="primary">
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
			justify="center"
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
