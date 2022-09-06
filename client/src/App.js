import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router, 
    Route, 
    Routes, 
    Link
} from 'react-router-dom'
import PlayerBoard from './components/PlayerBoard';
import Join from './components/Join';
import { socket, SocketContext } from './context/socket';

const App = () => {
    return (
        <SocketContext.Provider value={socket}>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Join socket={socket}/>}/>
                    <Route path="/:roomId" element={<PlayerBoard socket={socket}/>}/>
                </Routes>
            </Router>
        </SocketContext.Provider>
    )
}

export default App;
