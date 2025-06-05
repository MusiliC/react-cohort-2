import React from "react";
// styling -> html + css file
// import styles from "./Navbar.module.css";

const Navbar = (props) => {

  console.log(props)

  console.log(props.nameX)

  return (
    // <div className={styles.navContainer}>
    <div className="bg-gray-800 text-white text-lg flex justify-center gap-5 p-4">
      <p>{props.nameX}</p>
      <p className="">Home</p>
      <p className="">Todo</p>
      <p className="">About</p>
    </div>
  );
};

export default Navbar;

// htm -> <div class = "navClass"></div>
