import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.init";
import { setUser } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Loading from "./components/reusable/Loading";



function App() {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
      }
    })
  }, [])

  isLoading && <Loading />
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
