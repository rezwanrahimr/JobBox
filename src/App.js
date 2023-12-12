import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.init";
import { setUser, updateRole } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Loading from "./components/reusable/Loading";
import { useLoadUserQuery } from "./features/auth/authApi";


function App() {
  const { data, error } = useLoadUserQuery();
  const { isLoading, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if (user) {
        dispatch(setUser(user.email));
      }
    })

    if (email && data) {
      const userRole = data?.find(user => user.email === email)?.role;
      console.log(userRole)
      dispatch(updateRole(userRole))
    }
  }, [data, email])
  isLoading && <Loading />
  console.log(data)
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
