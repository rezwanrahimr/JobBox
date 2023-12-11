import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  console.log(process.env);
  return (
    <>
      <RouterProvider router={routes} />
      <Provider store={store} />
    </>
  );
}

export default App;
