import { useEffect, useState } from "react";
import "./App.css";
import { Loader } from "./components";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((useData) => {
        if (useData) {
          dispatch(login({ useData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  });
  return !loading ? <div className="bg-red-">jay</div> : <Loader />;
}

export default App;
