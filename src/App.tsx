import { useState } from "react";
import Login, { LoginInfo } from "./Login";
import Menu from "./Menu";

type AppState = {
  loginInfo?: LoginInfo,
  name?: string,
};


export default function App() {
  const [appState, setAppState]: [AppState, (appState: AppState) => void] = useState({});

  if (appState.loginInfo) {
    return <Menu />
  } else {
    return (<Login failed={() => {}} succeeded={(loginInfo: LoginInfo) => {setAppState({loginInfo})}} />);
  }
}
