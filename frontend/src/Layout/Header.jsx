import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

export default function Header(){

    const [isOpen, toggleBtn] = useState(false);
    const [changeText, setBtnText] = useState(false);

    function handleClick(){
        toggleBtn(!isOpen);
        setBtnText(!changeText);
    }

    return (
        <div id="header">
            <h1>My Blog</h1>
            <button onClick={handleClick}>{changeText ? <CloseIcon /> : <MenuIcon />}</button>
            <div id="nav-bar" className={`nav-links ${isOpen ? 'open': ''}`}>
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} >Home</NavLink>
                <NavLink to="/insert" className={({ isActive }) => isActive ? "active" : ""} >Create</NavLink>
            </div>
        </div>
    );
}