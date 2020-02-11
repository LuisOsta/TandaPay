import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import styles from "./wallet.style";
import WalletOverview from "./pages/WalletOverview";
import TransferReview from "./pages/TransferReview";

class Wallet extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route
                        exact
                        path="/admin/wallet"
                        component={WalletOverview}
                    />
                    <Route
                        exact
                        path="/admin/wallet/:id"
                        component={TransferReview}
                    />
                </Switch>
            </main>
        );
    }
}
export default withStyles(styles, { withTheme: true })(Wallet);
