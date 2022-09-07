import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, Navigate } from "react-router-dom";
import { SocketContext } from '../context/socket';
import ParticlesBackground from './Particles';

const Circle = styled.div`
`

const Board = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
`

const Player = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 20px;
    background-color: blue;
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    
    display: flex;
    justify-content: center;
    align-items: center;

    & > p {
        font-family: Roboto;
        font-size: 20px;
        color: white;
    }
`

const PlayerBoard = () => {
    const socket = useContext(SocketContext);
    const location = useLocation();

    var initState = location.state || null;
    
    const [players, setPlayers] = useState(initState);
    const numPlayers = players ? players.length : -1;
    
    useEffect(() => {
        socket.on('joinSuccess', (data) => setPlayers(data));
        return () => {
		    socket.off('joinSuccess', (data) => setPlayers(data));
		};
    }, [socket]) 
    
    let size = 400;
    let r = size/2 + 80;
  
    function degToRad(deg) {
        return deg * Math.PI / 180;
    }

    let theta = 2*Math.PI/numPlayers;

    return (
        players ? 
        <Board>
            <ParticlesBackground></ParticlesBackground>
            <Circle style={{backgroundColor: "red", 
                width: size,
                height: size,
                borderRadius: size/2}}>
            </Circle>

            {players.map((val, idx) => {
                return(
                    <Player style={{
                        top: `calc(${r*Math.cos(2*Math.PI/numPlayers*idx)}px + 50%)`,
                        left: `calc(${r*Math.sin(2*Math.PI/numPlayers*idx)}px + 50%)`
                    }}>
                        <p>{val.username}</p>
                    </Player>
                )
            })}
        </Board> :
        <Navigate to="/" state={{room: window.location.pathname.slice(7)}}/>
    )
}

export default PlayerBoard;