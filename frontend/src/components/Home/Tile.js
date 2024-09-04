import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../index.css'

import TileIcon from '../../svgs/Home/Tasks/TileIcon';

const Tile = ({ }) => {
    const navigate = useNavigate();

    return (
        <div class="bg-tileBlue w-3/5 h-full rounded-3xl">
            <TileIcon class="" />
        </div>
    );
}

export default Tile;