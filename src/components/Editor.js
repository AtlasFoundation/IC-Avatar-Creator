import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
export default function Editor(props) {
    const { category, setCategory } = props;
    const selectorButton = {
        color: "#999999",
        fontSize: "12px",
        minWidth: "60px",
        cursor: "pointer",
    };
    const selectorButtonActive = {
        color: "#666666",
        fontSize: "12px",
        minWidth: "60px",
        cursor: "pointer",
    };
    const selectorButtonIcon = {
        display: "inline-block",
        width: "40px",
        height: "40px",
        padding: "2px",
    };
    return (_jsx("div", { style: {
            position: "absolute",
            left: "0",
            bottom: "0",
            width: "100vw",
            backgroundColor: "#111111",
            borderTop: "1px solid #303030",
            padding: "14px 0",
        }, children: _jsxs(Stack, { direction: "row", divider: _jsx(Divider, { orientation: "vertical", flexItem: true }), spacing: 2, justifyContent: "center", alignItems: "center", children: [_jsxs("div", { onClick: () => setCategory('color'), style: category && category === "color" ? selectorButton : selectorButtonActive, children: [_jsx(Avatar, { style: selectorButtonIcon, src: '/color.png' }), _jsx("br", {}), "Skin Tone"] }), _jsxs("div", { onClick: () => setCategory('body'), style: category && category === "body" ? selectorButton : selectorButtonActive, children: [_jsx(Avatar, { style: selectorButtonIcon, src: '/face.png' }), _jsx("br", {}), "Body"] }), _jsxs("div", { onClick: () => setCategory('hair'), style: category && category === "hair" ? selectorButton : selectorButtonActive, children: [_jsx(Avatar, { style: selectorButtonIcon, src: '/hair.png' }), _jsx("br", {}), "Hair"] }), _jsxs("div", { onClick: () => setCategory('face'), style: category && category === "face" ? selectorButton : selectorButtonActive, children: [_jsx(Avatar, { style: selectorButtonIcon, src: '/face.png' }), _jsx("br", {}), "Face"] }), _jsxs("div", { onClick: () => setCategory('tops'), style: category && category === "tops" ? selectorButton : selectorButtonActive, children: [_jsx(Avatar, { style: selectorButtonIcon, src: '/shirt.png' }), _jsx("br", {}), "Tops"] }), _jsxs("div", { onClick: () => setCategory('arms'), style: category && category === "arms" ? selectorButton : selectorButtonActive, children: [_jsx(Avatar, { style: selectorButtonIcon, src: '/arms.png' }), _jsx("br", {}), "Arms"] }), _jsxs("div", { onClick: () => setCategory('shoes'), style: category && category === "shoes" ? selectorButton : selectorButtonActive, children: [_jsx(Avatar, { style: selectorButtonIcon, src: '/shoes.png' }), _jsx("br", {}), "Shoes"] }), _jsxs("div", { onClick: () => setCategory('legs'), style: category && category === "legs" ? selectorButton : selectorButtonActive, children: [_jsx(Avatar, { style: selectorButtonIcon, src: '/legs.png' }), _jsx("br", {}), "Legs"] })] }) }));
}
