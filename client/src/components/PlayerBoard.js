import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
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
`

const PlayerBoard = () => {
    const socket = useContext(SocketContext);
    const location = useLocation();
    const [players, setPlayers] = useState(location.state);
    const numPlayers = players.length;

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
        <Board>
            <ParticlesBackground></ParticlesBackground>
            <Circle style={{backgroundColor: "red", 
                width: size,
                height: size,
                borderRadius: size/2}}>
            </Circle>

            {Array(numPlayers).fill().map((val, idx) => {
                return(
                    <Player style={{
                        top: `calc(${r*Math.cos(2*Math.PI/numPlayers*idx)}px + 50%)`,
                        left: `calc(${r*Math.sin(2*Math.PI/numPlayers*idx)}px + 50%)`
                    }}/>
                )
            })}
        </Board>
    )
}

export default PlayerBoard;