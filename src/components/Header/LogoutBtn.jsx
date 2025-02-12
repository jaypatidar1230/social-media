import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full"
    >
      Logout
    </button>
  );
}
export default LogoutBtn;
