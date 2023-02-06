import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppDispatch, useAppSelecor } from "./store/hooks";
import { batch } from "react-redux";
import { incremented } from "./features/counter/counter-slice";
import { gets, init } from "./features/user/user-slice";
import { useFetchBreedsQuery } from "./dogs/dogs-api-slice";
import { persistor } from "./store/store";

function App() {
  const value = useAppSelecor((state) => state.reducer.value);
  const userValue = useAppSelecor((state) => state.appreducer.age);
  const dispatch = useAppDispatch();
  const { data = [], isFetching } = useFetchBreedsQuery({ limit: 10, page: 3 });

  function addClick(num: number) {
    batch(() => {
      dispatch(incremented(num));
      dispatch(gets(num));
    });
  }
  function initialState() {
    // await persistor.purge();
    dispatch(init(undefined));
  }
  console.log(window.localStorage);
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          value:{value}
          <br /> appvalue:{userValue}
        </a>
        <button onClick={() => addClick(22)}>click</button>
        <button onClick={() => initialState()}>initState!</button>
        {/* <div
          style={{ overflow: "scroll", height: "200px", overflowX: "hidden" }}
        >
          {isFetching
            ? "loading..."
            : data.map((r) => (
                <p>
                  <h1 key={r.id}>{r.name}</h1>
                </p>
              ))}
        </div> */}
      </header>
    </div>
  );
}

export default App;
