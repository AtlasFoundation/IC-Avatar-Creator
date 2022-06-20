import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createTheme, ThemeProvider } from "@mui/material";
import { VRM, VRMSchema } from "@pixiv/three-vrm";
import { Suspense, useState, useEffect, Fragment } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { sceneService } from "../services";
import DownloadCharacter from "./Download";
import LoadingOverlayCircularStatic from "./LoadingOverlay";
import Scene from "./Scene";
export default function CharacterEditor(props) {
    // State Hooks For Character Editor ( Base ) //
    // ---------- //
    // Charecter Name State Hook ( Note: this state will also update the name over the 3D model. )
    // const [characterName, setCharacterName] =
    //   useState<string>("Character Name");
    // Categories State and Loaded Hooks
    // const [categories, setCategories] = useState([]);
    // const [categoriesLoaded, setCategoriesLoaded] =
    //   useState<boolean>(false);
    // TODO: Where is setNodes
    // const [nodes, setNodes] = useState<object>(Object);
    // const [materials, setMaterials] = useState<object>(Object);
    // const [animations, setAnimations] = useState<object>(Object);
    // const [body, setBody] = useState<any>();
    const { theme, templates, mintPopup } = props;
    // Selected category State Hook
    const [category, setCategory] = useState("color");
    // 3D Model Content State Hooks ( Scene, Nodes, Materials, Animations e.t.c ) //
    const [model, setModel] = useState(Object);
    const [scene, setScene] = useState(Object);
    // States Hooks used in template editor //
    const [templateInfo, setTemplateInfo] = useState({ file: null, format: null });
    const [downloadPopup, setDownloadPopup] = useState(false);
    const [template, setTemplate] = useState(1);
    const [loadingModelProgress, setLoadingModelProgress] = useState(0);
    const [avatar, setAvatar] = useState({
        hair: {},
        face: {},
        tops: {},
        arms: {},
        shoes: {},
        legs: {}
    });
    const [loadingModel, setLoadingModel] = useState(false);
    const defaultTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#de2a5e",
            },
        },
    });
    useEffect(() => {
        if (avatar) {
            sceneService.setTraits(avatar);
        }
    }, [avatar]);
    useEffect(() => {
        if (templateInfo.file && templateInfo.format) {
            setLoadingModel(true);
            const loader = new GLTFLoader();
            loader
                .loadAsync(templateInfo.file, (e) => {
                setLoadingModelProgress((e.loaded * 100) / e.total);
            })
                .then((gltf) => {
                VRM.from(gltf).then((vrm) => {
                    vrm.scene.traverse((o) => {
                        o.frustumCulled = false;
                    });
                    vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips).rotation.y = Math.PI;
                    setLoadingModel(false);
                    setScene(vrm.scene);
                    setModel(vrm);
                });
            });
        }
    }, [templateInfo.file]);
    return (_jsx(Suspense, { fallback: "loading...", children: _jsx(ThemeProvider, { theme: theme ?? defaultTheme, children: templateInfo && (_jsxs(Fragment, { children: [loadingModel && (_jsx(LoadingOverlayCircularStatic, { loadingModelProgress: loadingModelProgress })), _jsx(DownloadCharacter, { scene: scene, templateInfo: templateInfo, model: model, downloadPopup: downloadPopup, setDownloadPopup: setDownloadPopup }), _jsx(Scene, { wrapClass: "generator", templates: templates, scene: scene, downloadPopup: downloadPopup, mintPopup: mintPopup, category: category, setCategory: setCategory, avatar: avatar, setAvatar: setAvatar, 
                        // hair={hair}
                        // setHair={setHair}
                        // face={face}
                        // setFace={setFace}
                        // tops={tops}
                        // setTops={setTops}
                        // arms={arms}
                        // setArms={setArms}
                        // shoes={shoes}
                        // setShoes={setShoes}
                        // legs={legs}
                        // setLegs={setLegs}
                        setTemplate: setTemplate, template: template, setTemplateInfo: setTemplateInfo, templateInfo: templateInfo })] })) }) }));
}
