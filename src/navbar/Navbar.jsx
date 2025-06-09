import React from "react";
// styling -> html + css file
// import styles from "./Navbar.module.css";

// const Navbar = (props) => {

  // destructuring direct from props
  const Navbar = ({ appTitle }) => {
    // const object1 = {
    //   name:"Monday",
    //   topic: "Why Monday"
    // }

    // console.log(object1.name);

    // // destructuring

    // const {name} = object1;
    // console.log(name);

    // destructure from props
    // const {appTitle} = props

    return (
      // <div className={styles.navContainer}>
      <div className="bg-gray-800 text-white text-lg flex justify-center gap-5 p-4">
        <p>{appTitle}</p>
        <p className="">Home</p>
        <p className="">Todo</p>
        <p className="">About</p>
      </div>
    );
  };

export default Navbar;

// htm -> <div class = "navClass"></div>
