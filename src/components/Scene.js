import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import Editor from "./Editor";
import { TemplateModel } from "./Models";
import Selector from "./Selector";
import { sceneService } from "../services";
export default function Scene(props) {
    const { wrapClass, templates, scene, downloadPopup, mintPopup, category, setCategory, avatar, setAvatar, 
    // hair,
    // setHair,
    // face,
    // setFace,
    // tops,
    // setTops,
    // arms,
    // setArms,
    // shoes,
    // setShoes,
    // legs,
    // setLegs,
    setTemplate, template, setTemplateInfo, templateInfo } = props;
    useEffect(() => {
        if (scene) {
            sceneService.setScene(scene);
        }
    }, [scene]);
    const canvasWrap = {
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: "0",
        top: "0",
        backgroundColor: "#111111"
    };
    return (_jsxs("div", { style: {
            width: "100vw",
            height: "100vh",
            position: "relative"
        }, children: [_jsx("div", { id: "canvas-wrap", className: `canvas-wrap ${wrapClass && wrapClass}`, style: { ...canvasWrap, height: window.innerHeight - 89 }, children: _jsxs(Canvas, { className: "canvas", id: "editor-scene", children: [_jsx("gridHelper", { args: [50, 25, "#101010", "#101010"], position: [0, 0, 0] }), _jsx("spotLight", { intensity: 1, position: [0, 3.5, 2], "shadow-mapSize-width": 2048, "shadow-mapSize-height": 2048, castShadow: true }), _jsx("spotLight", { intensity: 0.2, position: [-5, 2.5, 4], "shadow-mapSize-width": 2048, "shadow-mapSize-height": 2048 }), _jsx("spotLight", { intensity: 0.2, position: [5, 2.5, 4], "shadow-mapSize-width": 2048, "shadow-mapSize-height": 2048 }), _jsx("spotLight", { intensity: 0.3, position: [0, -2, -8], "shadow-mapSize-width": 2048, "shadow-mapSize-height": 2048, castShadow: true }), _jsx(OrbitControls, { minDistance: 1, maxDistance: 3, minPolarAngle: 0.0, maxPolarAngle: Math.PI / 2 - 0.1, enablePan: false, target: [0, 1, 0] }), _jsx(PerspectiveCamera, { children: !downloadPopup && !mintPopup && (_jsx(TemplateModel, { scene: scene })) })] }) }), _jsxs("div", { children: [_jsx(Selector, { templates: templates, category: category, scene: scene, avatar: avatar, setAvatar: setAvatar, setTemplate: setTemplate, template: template, setTemplateInfo: setTemplateInfo, templateInfo: templateInfo }), _jsx(Editor, { category: category, setCategory: setCategory })] })] }));
}
