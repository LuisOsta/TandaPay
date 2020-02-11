import React from "react";
import { Grid, withStyles, Typography } from "@material-ui/core";
import styles from "./wallet.style";
import ButtonGroup from "../components/ButtonGroup/";
import MetamaskIcon from "../../../assets/metamask.svg";
import FortmaticIcon from "../../../assets/fortmatic.svg";
import WalletCard from "./components/WalletCard";

import {
  connectToMetamask,
  connectToFortmatic,
  currentProvider
} from "../../../web3/";

/**
 * @summary
 * @class
 * @typedef {React.Component} WalletPage
 * @property {Object} classes
 * @property {String} ethAddress
 * @property {String} walletProvider
 * @property {Boolean} fortmaticLoading
 * @property {Boolean} metamaskLoading
 */
class WalletPage extends React.Component {
  constructor(props) {
    super(props);
    const wallet = currentProvider();
    this.state = {
      walletProvider: wallet,
      ethAddress: "",
      metamaskLoading: false,
      fortmaticLoading: false
    };
  }
  render() {
    const { classes } = this.props;
    const {
      walletProvider,
      metamaskLoading,
      fortmaticLoading,
      ethAddress
    } = this.state;
    const formCompleted = walletProvider && ethAddress;
    return (
      <div>
        <Typography variant="h3" className={classes.title}>
          What will your wallet provider be?
        </Typography>
        <Grid container>
          <WalletCard
            type="metamask"
            handleClick={this.onMetamaskClick}
            IconSrc={MetamaskIcon}
            loading={metamaskLoading}
            selected={walletProvider}
          />
          <WalletCard
            type="fortmatic"
            handleClick={this.onFormaticClick}
            IconSrc={FortmaticIcon}
            loading={fortmaticLoading}
            selected={walletProvider}
          />
        </Grid>
        <ButtonGroup
          handleNext={this.handleNext}
          handlePrevious={this.props.previousPage}
          page={1}
          disabled={!formCompleted}
        />
      </div>
    );
  }
  handleNext = () => {
    const { walletProvider, ethAddress } = this.state;
    this.props.onPageSubmit(walletProvider, ethAddress);
  };

  /**
   * @summary
   * @async
   * @returns {VoidFunction} - will update component state with the ethereum addressif successful, otherwise resets component visuals from loading
   */
  onMetamaskClick = async () => {
    const walletProvider = "metamask";
    this.setState({
      metamaskLoading: true,
      fortmaticLoading: false
    });
    //enable metamask
    const [result, error] = await connectToMetamask();
    const ethAddress = result[0];
    if (error) {
      this.setState({
        metamaskLoading: false
      });
    } else {
      this.setState({
        walletProvider,
        ethAddress,
        metamaskLoading: false
      });
    }
  };

  /**
   * @summary
   * @async
   * @returns {VoidFunction}
   */
  onFormaticClick = async () => {
    const walletProvider = "fortmatic";
    this.setState({
      walletProvider,
      fortmaticLoading: true,
      metamaskLoading: false
    });
    //enable fortmatic
    const [result, error] = await connectToFortmatic();
    const ethAddress = result[0];
    if (error) {
      this.setState({
        walletProvider: "",
        fortmaticLoading: false
      });
    } else {
      this.setState({
        ethAddress,
        fortmaticLoading: false
      });
    }
  };
}
export default withStyles(styles, { withTheme: true })(WalletPage);
