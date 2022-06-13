import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CloseIcon from "@mui/icons-material/Close";
import GavelIcon from "@mui/icons-material/Gavel";
import { Modal, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { TemplateModel } from "../components/Models";
import { contractABI, contractAddress } from "../library/contract";
import { sceneService } from "../services";
import { apiService } from "../services/api";
import "./style.scss";

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

export default function ConnectMint({getTraits, getScene}) {
  const [ totalMinted, setTotalMinted ] = React.useState(0);
  const [ mintPopup, setMintPopup ] = React.useState(false);
  const { ethereum }: any = window;
  const { activate, deactivate, library, account } = useWeb3React();

  const {
    mintPrice,
    maxSupply
  } = {
    mintPrice: 0,
    maxSupply: 100000
  }
  
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 97],
  });

  const [connected, setConnected] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [mintLoading, setMintLoading] = useState(false);

  const [glb, setGLB] = useState(null);
  const [screenshot, setScreenshot] = useState(null);

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    account ? setConnected(true) : setConnected(false);
  }, [account]);

  useEffect(() => {
    if (glb && screenshot) {
        mintAvatarToEthereum();
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
    sceneService
      .getScreenShotByElementId("mint-screenshot-canvas-wrap")
      .then((screenshot) => {
        if (screenshot) {
          setScreenshot(screenshot);
          sceneService.getModelFromScene(getScene(), "gltf/glb").then((glb) => {
            setGLB(glb);
            console.log(glb);
            console.log(screenshot);
          });
        }
      });
  };

  const mintAvatarToEthereum = async () => {
    const {
      hair,
      face,
      tops,
      arms,
      shoes,
      legs,
    }: any = getTraits();
    
    //////////////////////////// upload part //////////////////////
    /// ---------- glb -------------- ////////////////
    const formData = new FormData();
    formData.append("profile", glb);
    const glburl: any = await apiService.saveFileToPinata(formData);
    /// ---------- .jpg (screenshot) -------------- ////////////////
    const jpgformData = new FormData();
    jpgformData.append("profile", screenshot);
    const jpgurl: any = await apiService.saveFileToPinata(jpgformData);
    console.log("UPLOADED TO PINATA, Upload Result", jpgurl);
    /// ---------- metadata ------------- /////////////////
    const metadata = {
      name: import.meta.env.VITE_ASSET_NAME ?? "Avatars",
      description: import.meta.env.VITE_ASSET_DESCRIPTION ?? "Custom avatars.",
      image: "https://gateway.pinata.cloud/ipfs/" + jpgurl.IpfsHash,
      animation_url: "https://gateway.pinata.cloud/ipfs/" + glburl.IpfsHash,
      attributes: [
        {
          trait_type: "Hair",
          value: hair?.traitInfo ? hair?.traitInfo?.name : "None"
        },
        {
          trait_type: "Face",
          value: face?.traitInfo ? face?.traitInfo?.name : "None"
        },
        {
          trait_type: "Tops",
          value: tops?.traitInfo ? tops?.traitInfo?.name : "None"
        },
        {
          trait_type: "Arms",
          value: arms?.traitInfo ? arms?.traitInfo?.name : "None"
        },
        {
          trait_type: "Legs",
          value: legs?.traitInfo ? legs?.traitInfo?.name : "None"
        },
        {
          trait_type: "Shoes",
          value: shoes?.traitInfo ? shoes?.traitInfo?.name : "None"
        }
      ]
    };

    const MetaDataUrl: any = await apiService.saveMetaDataToPinata(metadata);
    console.log(MetaDataUrl);
    let amountInEther = mintPrice;
    try {
      console.log("public");
      const options = {
        value: ethers.utils.parseEther(amountInEther),
        from: account,
      };
      await contract.mintNormal(
        "ipfs://" + MetaDataUrl.data.IpfsHash,
        options
      ); // tokenuri
      setMintLoading(false);
      handleCloseMintPopup();
      alertModal("Public Mint Success");
    } catch (error) {
      console.log(error);
      handleCloseMintPopup();
      // alertModal(error.message);
      alertModal("Public Mint Failed");
    }
    return false;
  };

  const handleOpenMintPopup = async () => {
    setMintPopup(true);

    // ethereum
    if (account) {
      const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const MintedToken = await contract.totalSupply();
      setTotalMinted(parseInt(MintedToken));
    }


  };
  const handleCloseMintPopup = () => {
    setMintPopup(false);
  };

  return (
    <>
      <div className="connect-mint-wrap">
        <Button
          variant="contained"
          startIcon={<AccountBalanceWalletIcon />}
          onClick={connectWallet}
        >
          Connect
        </Button>

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
            <div
              id="mint-screenshot-canvas-wrap"
              className={`canvas-wrap`}
              style={{
                height: 2080,
                width: 2080,
                zoom: 0.2,
                background: "#111111",
              }}
            >
              <Canvas
                className="canvas"
                id="screenshot-scene"
                gl={{ preserveDrawingBuffer: true }}
              >
                <spotLight
                  // ref={ref}
                  intensity={1}
                  position={[0, 3.5, 2]}
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  castShadow
                />
                <spotLight
                  // ref={ref}
                  intensity={0.2}
                  position={[-5, 2.5, 4]}
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                // castShadow
                />
                <spotLight
                  // ref={ref}
                  intensity={0.2}
                  position={[5, 2.5, 4]}
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                // castShadow
                />
                <spotLight
                  // ref={ref}
                  intensity={0.3}
                  position={[0, -2, -8]}
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  castShadow
                />
                <OrbitControls
                  minDistance={1}
                  maxDistance={1}
                  minPolarAngle={0}
                  maxPolarAngle={Math.PI / 2 - 0.1}
                  enablePan={false}
                  target={[0, 1.5, 0]}
                />
                <PerspectiveCamera
                  near={0.0001}
                  fov={25}
                >
                  {mintPopup && (
                    <TemplateModel scene={getScene()} />
                  )}
                </PerspectiveCamera>
              </Canvas>
            </div>
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
