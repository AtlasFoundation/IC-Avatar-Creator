import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme } from "@mui/material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { PlugWallet } from './ic/PlugWallet';
import { Mint } from "./ic/Mint";
import CharacterEditor from "./components/index";
import defaultTemplates from "./data/base_models";
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
    position: "absolute",
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
    const [mintTraits, setMintTraits] = useState({ hair: null, face: null, tops: null, arms: null, legs: null, shoes: null });
    const [PreviewCanvas, setPreviewCanvas] = useState(null);
    const handleConnect = (principalId) => {
        console.log("Logged in with principalId", principalId);
        setPrincipalId(principalId);
        setConnected(true);
    };
    const handleFail = (error) => {
        console.log("Failed to login with Plug", error);
    };
    return (_jsxs(_Fragment, { children: [_jsx(CharacterEditor, { theme: theme, templates: defaultTemplates, setMintTraits: setMintTraits, setPreviewCanvas: setPreviewCanvas }), _jsx("div", { className: "connect-mint-wrap", children: _jsx(PlugWallet, { onConnect: handleConnect, onFail: handleFail, children: _jsx(Mint, { onSuccess: (callback) => {
                            setShowAlert(true);
                            setAlertTitle(callback && JSON.stringify(callback, (key, value) => typeof value === 'bigint'
                                ? value.toString()
                                : value // return everything else unchanged
                            ) || "Success");
                        } }) }) }), showAlert && (_jsx(Alert, { id: "alertTitle", variant: "filled", severity: "success", action: _jsx(IconButton, { "aria-label": "close", color: "inherit", size: "small", onClick: () => {
                        setShowAlert(false);
                    }, children: _jsx(CloseIcon, { fontSize: "inherit" }) }), sx: { mb: 2 }, children: alertTitle }))] }));
}
