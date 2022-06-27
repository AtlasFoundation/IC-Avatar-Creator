import React, {useState} from 'react'
import {Modal} from "@mui/material";
import Button from "@mui/material/Button";
import {Box} from "@mui/system";
import {OrbitControls} from "@react-three/drei/core/OrbitControls";
import {PerspectiveCamera} from "@react-three/drei/core/PerspectiveCamera";
import {Canvas} from "@react-three/fiber";
import {sceneService} from "../services";
import {TemplateModel} from "../components/Models";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

const closePopup = {
    position: "absolute",
    right: 0,
    top: 11,
    background: "none",
    color: "#999999"
}

export default function TradeNft({
    scene,
    templateInfo,
    model,
    tradePopup,
    setTradePopup
}) {
    const downloadModel = (format : any) => {
        sceneService.download(model, `CC_Model_${
            templateInfo.name.replace(" ", "_")
        }`, format, false);
    };
    const handleOpen = () => {
        setTradePopup(true);
    };
    const handleClose = () => {
        setTradePopup(false);
    };

    const modalButtons = {
        display: "flex",
        cursor: "pointer",
        flexdirection: "row",
        flexwrap: "wrap",
        width: "380px",
        margin: "auto"
    }

    const statusBubbleConnected = {
        backgroundColor: "rgba(0,255,0,0.5)"
    }

    const buttonModal = {
        width: "190px",
        backgroundColor: "rgba(49, 49, 49, 0.8)",
        color: 'black',
        hover: {
            backgroundColor: "rgba(49, 49, 49, 0.8)"
        }
    }

    return (
    
                    <div style={
                        {
                            position: "absolute",
                            top: "20px",
                            right: "174px",
                            margin: "60px",
                            zIndex: 10
                        }
                    }>
                        <Button id="download-button" aria-controls="download-menu" aria-haspopup="true"
                            aria-expanded={
                                tradePopup ? "true" : undefined
                            }
                            onClick={handleOpen}>
                            <Button>
                                Trade nft
                            </Button>
                        </Button>
                        <Modal open={tradePopup}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description">
                            <Box sx={
                                {
                                    ... style,
                                    border: 0
                                }
                            }>
                                <Button onClick={handleClose}
                                    sx={closePopup}>Cancel</Button>
                                <Button onClick={
                                    () => downloadModel('vrm')
                                }>Confirm
                                </Button>
                                <div id="screenshot-canvas-wrap"
                                    style={
                                        {
                                            height: 2080,
                                            width: 2080,
                                            zoom: 0.2,
                                            background: "#111111"
                                        }
                                }>
                                    <Canvas id="screenshot-scene"
                                        gl={
                                            {preserveDrawingBuffer: true}
                                    }>
                                        <spotLight // ref={ref}
                                            intensity={1}
                                            position={
                                                [0, 3.5, 2]
                                            }
                                            shadow-mapSize-width={2048}
                                            shadow-mapSize-height={2048}
                                            castShadow/>
                                        <spotLight // ref={ref}
                                            intensity={0.2}
                                            position={
                                                [-5, 2.5, 4]
                                            }
                                            shadow-mapSize-width={2048}
                                            shadow-mapSize-height={2048}
                                            // castShadow
                                        />
                                        <spotLight // ref={ref}
                                            intensity={0.2}
                                            position={
                                                [5, 2.5, 4]
                                            }
                                            shadow-mapSize-width={2048}
                                            shadow-mapSize-height={2048}
                                            // castShadow
                                        />
                                        <spotLight // ref={ref}
                                            intensity={0.3}
                                            position={
                                                [0, -2, -8]
                                            }
                                            shadow-mapSize-width={2048}
                                            shadow-mapSize-height={2048}
                                            castShadow/>
                                        <OrbitControls minDistance={1}
                                            maxDistance={2}
                                            minPolarAngle={0}
                                            maxPolarAngle={
                                                Math.PI / 2 - 0.1
                                            }
                                            enablePan={true}
                                            target={
                                                [0, 1, 0]
                                            }/>
                                        <PerspectiveCamera> {
                                            tradePopup && (
                                                <TemplateModel scene={scene}/>
                                            )
                                        } </PerspectiveCamera>
                                    </Canvas>
                                </div>
                            </Box>
                        </Modal>
                    </div>
    )
}
