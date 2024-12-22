import { useReducer, useEffect } from "react";

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, token: null, isAuthenticated: false };
    default:
      return state;
  }
};

const initialAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    if (storedToken && storedUser) {
      dispatch({ type: "LOGIN", payload: { user: JSON.parse(storedUser), token: storedToken } });
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    dispatch({ type: "LOGOUT" });
  };

  return {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
