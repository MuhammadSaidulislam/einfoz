import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children, ...props }) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scrolling animation (optional)
        });
    }, []);
    return (
        <>
            <Header />
            <div {...props}>{children}</div>
        </>
    )
}

export default Layout