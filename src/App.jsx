import { useEffect, useState } from "react";
import { Footer, Header, Loader } from "./components";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

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
  return !loading ? (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-500">
      <Header />
      <main className="w-full text-center">
        <Outlet />
        <p>jay</p>
      </main>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
}

export default App;
