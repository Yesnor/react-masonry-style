import { useReducer, useMemo } from "react";
import App from "./App";
import { initialState, context, reducer } from "./context";

export default function AppContext() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <context.Provider value={contextValue}>
      <App />
    </context.Provider>
  );
}
