import React from "react";
import Wyre from "react-wyre";

/**
 * @type {React.Component}
 * @property -
 */
class WyreModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    render() {
        const accountID = process.env.REACT_APP_WYRE_ID;
        console.log(accountID)
        const { open } = this.state;
        return (
            <Wyre
                config={{
                    env: "test",
                    accountId: accountID,
                    auth: {
                        type: "metamask",
                    },
                    operation: {
                        type: "debitcard",
                        destCurrency: "ETH",
                        destAmount: 0.01,
                        dest: "0x0eCD499048eECC2FD150C32d27A3c28CCf9829Ba",
                    },
                    style: {
                        primaryColor: "#0055ff",
                    },
                }}
                open={open}
                onReady={() => console.log("ready")}
                onComplete={event => console.log("complete", event)}
            >
                <button onClick={() => this.setState({ open: true })}>
                    Send Eth 1
                </button>
            </Wyre>
        );
    }
}

export default WyreModal;
