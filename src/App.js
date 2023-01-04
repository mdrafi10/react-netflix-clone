import Layouts from "./app/layouts";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

function App() {
  return (
    <div className="bg-[#111]">
      <Provider store={store}>
        <Layouts />
      </Provider>
    </div>
  );
}

export default App;
