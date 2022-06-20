import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import { Canvas } from "@react-three/fiber";
import { sceneService } from "../services";
import { TemplateModel } from "./Models";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const closePopup = {
    position: "absolute",
    right: 0,
    top: 8,
    background: "none",
    color: "#999999"
};
export default function DownloadCharacter({ scene, templateInfo, model, downloadPopup, setDownloadPopup }) {
    const saveScreenshot = async (id) => {
        sceneService.saveScreenShotByElementId(id).then(() => { });
    };
    const downloadModel = (format) => {
        sceneService.download(model, `CC_Model_${templateInfo.name.replace(" ", "_")}`, format, false);
    };
    const handleOpen = () => {
        setDownloadPopup(true);
    };
    const handleClose = () => {
        setDownloadPopup(false);
    };
    return (_jsx("div", { style: {
            position: "absolute",
            top: "20px",
            right: "154px",
            zIndex: 10
        }, children: _jsx(Modal, { open: downloadPopup, onClose: handleClose, "aria-labelledby": "child-modal-title", "aria-describedby": "child-modal-description", children: _jsxs(Box, { sx: { ...style, border: 0 }, children: [_jsx(Button, { onClick: handleClose, sx: closePopup, children: _jsx(CloseIcon, {}) }), _jsx(Button, { onClick: () => downloadModel('vrm'), children: "Download VRM" }), _jsx(Button, { onClick: () => downloadModel('glb'), children: "Download GLB" }), _jsx(Button, { onClick: () => saveScreenshot('screenshot-canvas-wrap'), children: "Screenshot" }), _jsx("div", { id: "screenshot-canvas-wrap", style: { height: 2080, width: 2080, zoom: 0.2, background: "#111111" }, children: _jsxs(Canvas, { id: "screenshot-scene", gl: { preserveDrawingBuffer: true }, children: [_jsx("spotLight", { 
                                    // ref={ref}
                                    intensity: 1, position: [0, 3.5, 2], "shadow-mapSize-width": 2048, "shadow-mapSize-height": 2048, castShadow: true }), _jsx("spotLight", { 
                                    // ref={ref}
                                    intensity: 0.2, position: [-5, 2.5, 4], "shadow-mapSize-width": 2048, "shadow-mapSize-height": 2048 }), _jsx("spotLight", { 
                                    // ref={ref}
                                    intensity: 0.2, position: [5, 2.5, 4], "shadow-mapSize-width": 2048, "shadow-mapSize-height": 2048 }), _jsx("spotLight", { 
                                    // ref={ref}
                                    intensity: 0.3, position: [0, -2, -8], "shadow-mapSize-width": 2048, "shadow-mapSize-height": 2048, castShadow: true }), _jsx(OrbitControls, { minDistance: 1, maxDistance: 2, minPolarAngle: 0, maxPolarAngle: Math.PI / 2 - 0.1, enablePan: false, target: [0, 1, 0] }), _jsx(PerspectiveCamera, { children: downloadPopup && (_jsx(TemplateModel, { scene: scene })) })] }) })] }) }) }));
}
