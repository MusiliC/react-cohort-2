import { createContext, useContext } from "react";




// step 1 -> createContext function
export const TestContext = createContext("");


export function useTestContext(){
    const context = useContext(TestContext);

    if(context === undefined) throw new Error("Test context used outside of provider")

    return context;
}