import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import ParticlesBackground from './components/Particles';

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

const App = () => {
    let numplayers = 4;

    let size = 500;
    let r = size/2 + 80;
  
    
    function degToRad(deg) {
        return deg * Math.PI / 180;
    }

    let theta = 2*Math.PI/numplayers;
    
    return (
        <Board>
            <ParticlesBackground></ParticlesBackground>
            <Circle style={{backgroundColor: "red", 
                width: size,
                height: size,
                borderRadius: size/2}}>
            </Circle>

            {Array(numplayers).fill().map((val, idx) => {
                return(
                    <Player style={{
                        top: `calc(${r*Math.cos(2*Math.PI/numplayers*idx)}px + 50%)`,
                        left: `calc(${r*Math.sin(2*Math.PI/numplayers*idx)}px + 50%)`
                    }}/>
                )
            })}
        </Board>
    )
}

export default App;
