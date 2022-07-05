import CloseIcon from "@mui/icons-material/Close";
import GavelIcon from "@mui/icons-material/Gavel";
import { createTheme, Modal, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { PlugWallet } from './ic/PlugWallet';
import { Mint } from "./ic/Mint";
import CharacterEditor from "atlasavatarcreator/src/components/index";
import defaultTemplates from "atlasavatarcreator/src/data/base_models";

import "./ic/style.scss";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#de2a5e",
    },
  },
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ICApp() {
  const [connected, setConnected] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [principalId, setPrincipalId] = useState(false);
  const [mintTraits, setMintTraits] = useState({ neck: null, head: null, chest: null, body: null, legs: null, hand: null, waist: null, foot: null })
  const [PreviewCanvas, setPreviewCanvas] = useState(null)

  const handleConnect = (principalId) => {
    console.log("Logged in with principalId", principalId);
    setPrincipalId(principalId);
    setConnected(true);
  }

  const handleFail = (error) => {
    console.log("Failed to login with Plug", error);
  }

  return (
    <>
      <CharacterEditor theme={theme} templates={defaultTemplates} setMintTraits={setMintTraits} setPreviewCanvas={setPreviewCanvas} />
      <div className="connect-mint-wrap">
      <PlugWallet
        onConnect={handleConnect}
        onFail={handleFail}
      >
        <Mint onSuccess={(callback) => { setShowAlert(true); setAlertTitle("Mint Successful. View here: " + callback); }} />
      </PlugWallet>
      </div>
      {showAlert && (
        <Alert
          id="alertTitle"
          variant="filled"
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertTitle}
        </Alert>
      )}
    </>
  );
}