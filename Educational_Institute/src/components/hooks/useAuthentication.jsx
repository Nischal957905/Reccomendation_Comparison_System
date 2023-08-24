import { useContext } from "react";
import ContextAuthentication from "../auth/AuthProvider";

const useAuthentication = () => {
    return useContext(ContextAuthentication)
}

export default useAuthentication