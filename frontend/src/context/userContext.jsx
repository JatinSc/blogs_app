import { useState, createContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    // * localhost url => http://127.0.0.1:3000
    // * deployed url of backend => https://blogs-backend-mha8.onrender.com
    try {
      const res = await fetch("https://blogs-backend-mha8.onrender.com/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1000);
        } else {
          navigate(location.pathname ? location.pathname : "/");
        }
        setUser(result.user);
      } else {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;
