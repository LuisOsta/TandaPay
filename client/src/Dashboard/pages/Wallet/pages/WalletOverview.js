import React from "react";
import { withStyles } from "@material-ui/core/";
import styles from "../wallet.style";
import { PageHeader, Table as WalletTable } from "../../../components/";
import { WalletCard } from "../components/";
import { headRows } from "../data";
import transferData from "../../../../data/transfers.json";
//consts
const headerText = "Wallet Balance";
/**
 *
 * @param {Object} props
 * @todo add data generation for the scripts
 */
const WalletOverview = props => {
    const { classes } = props;
    const data = getTransferHistory();
    return (
        <React.Fragment>
            <PageHeader title={headerText} />
            <div className={classes.container}>
                <WalletCard />
                <WalletTable
                    data={data}
                    headRows={headRows}
                    title="Transfer History"
                    type="wallet"
                />
            </div>
        </React.Fragment>
    );
};

/**
 *
 */
const getTransferHistory = () => {
    //axios call
    const transfers = transferData.transfers;
    return transfers;
};

export default withStyles(styles, { withTheme: true })(WalletOverview);
