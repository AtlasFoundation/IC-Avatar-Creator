import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
export function PlugWallet({ onConnect, onFail, children }) {
    // The component will rerender whenever state variables change
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentBalance, setCurrentBalance] = useState();
    const [tokenName, setTokenName] = useState("");
    const [connected, setConnected] = useState(false);
    const [principal, setPrincipal] = useState();
    const getPlug = () => window.ic?.plug;
    const grabBalance = async () => {
        const res = await getPlug().requestBalance();
        setCurrentBalance(res[0].amount);
        setTokenName(res[0].name);
    };
    const plugLogin = async () => {
        if (connected)
            return console.log("connected");
        const plug = getPlug();
        if (!plug) {
            const error = "Could not connect - Plug is not installed";
            return onFail ? onFail(error) : console.error(error);
        }
        const hasLoggedIn = await plug.isConnected();
        if (!hasLoggedIn) {
            await plug.requestConnect();
        }
        else {
            await plug.createAgent();
        }
        const userPrincipal = await plug.agent.getPrincipal();
        if (!userPrincipal) {
            const error = "Could not connect - User authentication failed";
            return onFail ? onFail(error) : console.error(error);
        }
        setPrincipal(userPrincipal.toString());
        setConnected(true);
        await grabBalance();
        if (onConnect)
            onConnect(userPrincipal);
    };
    const walletContainerStyle = {
        float: "left",
        margin: "10px",
        overflow: "hidden",
    };
    const plugMenu = {
        background: "none",
        border: "1px solid #ffcf40",
        borderRadius: "10px",
        fontSize: "14px",
        padding: "8px 10px",
        color: "lightgoldenrodyellow",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        hover: {
            backgroundColor: "rgba(255,255,255,0.1)"
        }
    };
    const plugSettings = {
        position: "absolute",
        backgroundColor: "#202020",
        minWidth: "160px",
        maxWidth: "180px",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.6)",
        zIndex: "10",
    };
    const menuHeaderButton = {
        width: "80%",
        margin: "15px 10%",
        background: "none",
        border: "1px solid #ffcf40",
        borderRadius: "10px",
        fontSize: "12px",
        padding: "8px 10px",
        color: "lightgoldenrodyellow",
        cursor: "pointer",
        hover: {
            backgroundColor: "#303030",
        }
    };
    const menuHeaderButtonDisabled = {
        cursor: "default",
        background: "none",
        color: "silver",
        border: "1px solid rgba(255, 210, 67, 0.5)"
    };
    const menuHeaderH6 = {
        display: "block",
        padding: "0px 16px",
        height: "auto",
        margin: "0px",
        color: "lightgoldenrodyellow"
    };
    const balance = {
        flexDirection: "row",
        alignItems: "center",
    };
    const menuDivider = {
        height: "1px",
        width: "100%",
        backgroundColor: "#353535"
    };
    const statusBubble = {
        height: "10px",
        width: "10px",
        border: "1px solid black",
        borderRadius: "360px",
        marginLeft: "6px",
        backgroundColor: "rgba(255,0,0,0.5)"
    };
    const statusBubbleConnected = {
        backgroundColor: "rgba(0,255,0,0.5)"
    };
    const menuBody = {
        float: "none",
        color: "#ffcf40",
        padding: "12px 16px",
        margin: "0px",
        textDecoration: "none",
        textAlign: "left",
        fontSize: "18px",
        display: "block",
        height: "16px",
        hover: {
            backgroundColor: "#303030",
            cursor: "pointer",
        }
    };
    const balanceText = {
        fontSize: "16px",
        color: "#e7e7e7",
        padding: "12px 16px",
        margin: "0px"
    };
    // HTML(UI) returns stay inside of the export function
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "walletContainer", style: walletContainerStyle, children: [_jsxs("button", { onClick: () => { console.log("Setting show dropdown"); setShowDropdown(!showDropdown); }, id: 'plugMenu', className: 'plugMenu', style: plugMenu, children: ["Plug Menu", _jsx("div", { className: 'statusBubble', id: 'statusBubble', style: connected ? { ...statusBubble, ...statusBubbleConnected } : statusBubble })] }), showDropdown &&
                    _jsxs("div", { className: 'plugSettings', id: 'plugSettings', style: plugSettings, children: [_jsx("button", { onClick: () => { console.log("click"); plugLogin(); }, id: 'connect', disabled: connected, style: connected ? menuHeaderButton : menuHeaderButtonDisabled, children: connected ? "Connected!" : "Connect" }), connected && principal &&
                                _jsxs(_Fragment, { children: [_jsxs("div", { className: 'menuHeader', id: 'menuHeader', children: [_jsx("h6", { style: menuHeaderH6, children: principal ? "Logged In As:" + principal : "Not connected" }), _jsxs("div", { className: "balance", id: 'balance', style: balance, children: [_jsx("p", { style: balanceText, children: currentBalance ? "Balance:" : "Getting current balance..." }), currentBalance && tokenName &&
                                                            _jsx("p", { style: { color: 'rgba(0,255,0,0.5' }, children: currentBalance + " " + tokenName })] })] }), _jsx("div", { className: "menuDivider", style: menuDivider }), _jsx("div", { className: 'menuBody', style: menuBody, children: children })] })] })] }) }));
}
