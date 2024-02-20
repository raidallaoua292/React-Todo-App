import { createContext, useState,useContext } from "react";
import SnackBar from "../components/SnackBar";




export const SnackBarContext = createContext({});

export const SnackBarProvider = ({children}) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("")
  const showHideSnackBar = (message) => {
    setOpenSnackBar(true);
    setMessage(message);
    setTimeout(() => {
      setOpenSnackBar(false);
    }, 2000);
  }
    return(
        <SnackBarContext.Provider value={{showHideSnackBar} }>
            <SnackBar isVisable={openSnackBar} message={message}/>
            {children}
        </SnackBarContext.Provider>
    )
}

export const useSnackBar = () => {
  return useContext(SnackBarContext);
}

        