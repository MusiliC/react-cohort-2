
import { TestContext, useTestContext } from "../context/TestContext";

  const Navbar = () => {
    //   const { text, setText } = useContext(MyContext);

     const {  name } = useTestContext();
    console.log("Name from Navbar");
    console.log(name);
    
    

    return (
      <div className="bg-gray-800 text-white text-lg flex justify-center gap-5 p-4">
        <p className="">Home</p>
        <p className="">Todo</p>
        <p className="">About</p>

      </div>
    );
  };

export default Navbar;


