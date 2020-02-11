import React from "react";
import { Grid, Typography, Card, Divider } from "@material-ui/core";
import {
  currentProvider,
  connectToMetamask,
  connectToFortmatic
} from "../../../../../../../web3";
import { connect } from "react-redux";
import * as actions from "../../../../../../../actions";
//Styling
import styles from "./wallet.style";
import { withStyles } from "@material-ui/styles";
//components and icons
import MetamaskIcon from "../../../../../../../assets/metamask.svg";
import FortmaticIcon from "../../../../../../../assets/fortmatic.svg";
import ProviderCard from "./components/ProviderCard";

/**
 * @summary
 * @class
 * @typedef {React.Component} WalletProviders
 * @property {Object} classes
 * @property {String} selected
 * @property {Boolean} loading
 * @todo implement action creator for updating wallet provider
 */
class WalletProviders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: currentProvider(),
      loading: false
    };
  }
  render() {
    const providers = [
      {
        name: "Metamask",
        IconSrc: MetamaskIcon,
        handleClick: this.handleMetamaskClick
      },
      {
        name: "Fortmatic",
        IconSrc: FortmaticIcon,
        handleClick: this.handleFortmaticClick
      }
    ];
    const { classes } = this.props;
    const { selected, loading } = this.state;
    return (
      <Grid item xs={12} md={5} className={classes.container}>
        <Card className={classes.card}>
          <Typography variant="h5">Wallet Providers</Typography>
          <Divider className={classes.divider} />
          <div className={classes.providers}>
            {providers.map((provider, index) => {
              return (
                <ProviderCard
                  key={index}
                  {...provider}
                  loading={loading}
                  selected={selected}
                />
              );
            })}
          </div>
        </Card>
      </Grid>
    );
  }

  /**
   * @summary
   */
  handleMetamaskClick = async () => {
    const { user, updateWallet } = this.props;
    if (this.state.selected === "metamask") {
      return;
    }
    const selected = "metamask";
    this.setState({
      selected,
      loading: true
    });
    const [result, error] = await connectToMetamask();
    const ethAddress = result[0];
    if (error) {
      this.setState({
        selected: "",
        loading: false
      });
    } else {
      this.setState({
        loading: false
      });

      updateWallet({ user, provider: selected, ethAddress });
    }
  };

  /**
   * @summary
   */
  handleFortmaticClick = async () => {
    const { user, updateWallet } = this.props;

    if (this.state.selected === "formatic") {
      return;
    }
    const selected = "fortmatic";
    this.setState({
      selected,
      loading: true
    });

    const [result, error] = await connectToFortmatic();
    const ethAddress = result[0];
    if (error) {
      this.setState({
        selected: "",
        loading: false
      });
    } else {
      this.setState({
        loading: false
      });
      updateWallet({ user, provider: selected, ethAddress });
    }
  };
}

/**
 *
 * @param {Object} user
 */
function mapStateToProps({ user }) {
  return { user };
}
export default connect(
  mapStateToProps,
  actions
)(withStyles(styles, { withTheme: true })(WalletProviders));
