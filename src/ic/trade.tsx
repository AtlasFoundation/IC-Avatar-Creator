import React, {useState} from 'react'
import './trade.css'

type PlugWalletProps = {
    onConnect?: (userPrincipal : string) => void,
    onFail?: (reason : string) => void,
    children?: React.ReactNode
}

export function PlugWalletTrade({onConnect, onFail, children} : PlugWalletProps) { // The component will rerender whenever state variables change

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    const getPlug = () => (window as any).ic ?. plug;

    // const tradeItem = {
    //     background: "none" as "none",
    //     border: "1px solid #ffcf40",
    //     borderRadius: "10px",
    //     fontSize: "14px",
    //     padding: "8px 10px",
    //     color: "lightgoldenrodyellow",
    //     cursor: "pointer" as "pointer",
    //     display: "flex" as "flex",
    //     flexDirection: "row" as "row",
    //     justifyContent: "center" as "center",
    //     alignItems: "center" as "center",
    //     hover: {
    //         backgroundColor: "rgba(255,255,255,0.1)"
    //     }
    // }

    const statusBubble = {
        height: "10px",
        width: "10px",
        border: "1px solid black",
        borderRadius: "360px",
        marginLeft: "6px",
        backgroundColor: "rgba(255,0,0,0.5)"
    }

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
        <>
            <div>
                <button onClick={toggleModal}
                    className="btn-modal">
                    Trade nft
                </button>
                {
                modal && (
                    <div className="modal">
                        <div className="overlay">
                            <div className="modal-content">
                                <h2 className="trade-heading">Trade mint</h2>
                                <img src="./public/minted.png" alt="" className="image-nft"/>

                                <div className='modalButtons'
                                    style={modalButtons}>
                                    <div className="buttonModal" style={buttonModal}>
                                        <button className='confirm-modal'
                                            onClick={toggleModal}>
                                            Confirm
                                        </button>
                                    </div>

                                    <div className="buttonModal" style={buttonModal}>
                                        <button className='cancel-modal'
                                            onClick={toggleModal}>
                                            Cancel
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                )
            } </div>
        </>
    )
}
