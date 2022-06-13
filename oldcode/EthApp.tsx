import "./assets/styles/main.scss";
import CharacterEditor from "./components";
import { createTheme } from "@mui/material";
import templates from "./data/base_models.json";
import ConnectMint from "./ethereum/ConnectMint";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#de2a5e",
    },
  },
});

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function App() {
  return (
    <div className="main-wrap">
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConnectMint />
        <CharacterEditor templates={templates} theme={theme} />
      </Web3ReactProvider>
    </div>
  );
}
