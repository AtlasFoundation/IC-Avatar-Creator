import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
function CircularProgressWithLabel(props) {
    return (_jsx(Box, { sx: {
            position: "absolute",
            zIndex: 1000,
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(16,16,16,0.9)"
        }, children: _jsxs(Box, { sx: {
                position: "relative",
                display: "inline-flex"
            }, className: "vh-centered", children: [_jsx(CircularProgress, {}), _jsx(Box, { sx: {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }, children: _jsx(Typography, { variant: "caption", component: "div", color: "text.secondary", children: `${Math.round(props.value)}%` }) })] }) }));
}
export default function LoadingOverlayCircularStatic({ loadingModelProgress }) {
    return _jsx(CircularProgressWithLabel, { value: loadingModelProgress });
}
