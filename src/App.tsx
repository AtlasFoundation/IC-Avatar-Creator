import CloseIcon from "@mui/icons-material/Close";
import GavelIcon from "@mui/icons-material/Gavel";
import { createTheme, Modal, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./assets/styles/main.scss";
import templates from "./data/base_models.json";
import { PlugWallet } from './ic/PlugWallet';
import "./ic/style.scss";
import avatarcreator from "avatarcreator";

const {CharacterEditor, sceneService } = avatarcreator;

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
  const [mintPopup, setMintPopup] = useState(false);

  const [mintLoading, setMintLoading] = useState(false);

  const [principalId, setPrincipalId] = useState(false);

  const [glb, setGLB] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [mintTraits, setMintTraits] = useState({hair: null, face: null, tops: null, arms: null, legs: null, shoes: null})
  const [mintScene, setMintScene] = useState(null)
  const [PreviewCanvas, setPreviewCanvas] = useState(null)

  useEffect(() => {
    if (glb && screenshot) {
      mintAvatarToIC();
    }
  }, [glb, screenshot]);

  const alertModal = async (msg: string) => {
    setAlertTitle(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };


  const generateMintFiles = async () => {
    setMintLoading(true);
    const screenshot = await sceneService.getScreenShot()
    const glb = await sceneService.getModelFromScene(mintScene(), "gltf/glb");
    setScreenshot(screenshot);
    setGLB(glb);
  };

  const mintAvatarToIC = async () => {
    try {
      await (window as any).ic.plug.requestConnect();
    } catch {
      console.error("Failed to connect to Plug")
    }

    //////////////////////////// upload part //////////////////////
    /// ---------- glb -------------- ////////////////
    const formData = new FormData();
    formData.append("profile", glb);

    // TODO: Upload static static assets to canister
    const glburl: any = null // = await apiService.saveFileToPinata(formData);
    const jpgformData = new FormData();
    jpgformData.append("profile", screenshot);
    const jpgurl: any = null // = await apiService.saveFileToPinata(jpgformData);

    const imageUrl = null
    const animationUrl = null

    const metadata = {
      name: import.meta.env.VITE_ASSET_NAME ?? "Avatars",
      description: import.meta.env.VITE_ASSET_DESCRIPTION ?? "Custom avatars.",
      image: imageUrl,
      animation_url: animationUrl,
      attributes: [
        {
          trait_type: "Hair",
          value: mintTraits.hair?.traitInfo ? mintTraits.hair?.traitInfo?.name : "None"
        },
        {
          trait_type: "Face",
          value: mintTraits.face?.traitInfo ? mintTraits.face?.traitInfo?.name : "None"
        },
        {
          trait_type: "Tops",
          value: mintTraits.tops?.traitInfo ? mintTraits.tops?.traitInfo?.name : "None"
        },
        {
          trait_type: "Arms",
          value: mintTraits.arms?.traitInfo ? mintTraits.arms?.traitInfo?.name : "None"
        },
        {
          trait_type: "Legs",
          value: mintTraits.legs?.traitInfo ? mintTraits.legs?.traitInfo?.name : "None"
        },
        {
          trait_type: "Shoes",
          value: mintTraits.shoes?.traitInfo ? mintTraits.shoes?.traitInfo?.name : "None"
        }
      ]
    }

    // TODO: mint with metadata
    setMintLoading(false);
    handleCloseMintPopup();
    alertModal("Public Mint Success");
  };

  const handleOpenMintPopup = async () => {
    setMintPopup(true);
  };
  const handleCloseMintPopup = () => {
    setMintPopup(false);
  };

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
    <CharacterEditor templates={templates} theme={theme} setMintTraits={setMintTraits} setMintScene={setMintScene} setPreviewCanvas={setPreviewCanvas}/>
      <div className="connect-mint-wrap">
      <PlugWallet
        onConnect={handleConnect}
        onFail={handleFail}
      />

        {connected &&
          <React.Fragment>
            <Button
              variant="contained"
              startIcon={<GavelIcon />}
              onClick={handleOpenMintPopup}
            >
              Mint
            </Button>
          </React.Fragment>
        }
        <Modal
          open={mintPopup}
          onClose={handleCloseMintPopup}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, border: 0 }}>
            {mintLoading && (
              <Box className="mint-loading">
                <Typography className="vh-centered">Minting Model</Typography>
              </Box>
            )}
            <Button onClick={handleCloseMintPopup} className="close-popup">
              <CloseIcon />
            </Button>
            <Typography variant="h6" style={{ marginTop: "-4px" }}>
              <GavelIcon className="title-icon" /> Mint Avatar
            </Typography>
            {PreviewCanvas &&
              <PreviewCanvas />
            }
            <Button
              variant="contained"
              className="mint-model-button"
              onClick={generateMintFiles}
            >
              <React.Fragment>
                MINT
                {/* {totalMinted}/{maxSupply} Remaining */}
              </React.Fragment>
            </Button>
          </Box>
        </Modal>
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