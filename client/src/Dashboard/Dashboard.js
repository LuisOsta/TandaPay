import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import styles from "./dashboard.style";
import Navigation from "../Navigation/Navigation";
import { Payments, Profile, Group, Wallet, Claims, Help } from "./pages";
import * as actions from "../actions";
import Loader from "../components/Loader";

/**
 * @summary The dashboard component is the base of the application when the user is authenticated. This component
 * utilizes react-router to determine which page to render, and sets the base styling and structure for each dashboard page.
 * When the dashboard is initially created, it will add an event listener to the ethereum object, which will call the action creator
 * to update the web3 object if a change is detected
 * @type {React.Component}
 * @renders - It will render the baseline dashboard, wrapped by the notification provider,
 * the navigation and then the current page that the user is currently.
 */
class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.startEthereumListener();
  }

  /**
   * @summary When the component first mounts, we will fetch the current state of the group and claims for the current user.
   * It will also initiate the first connection attempt to the user's wallet provider.
   * Which will either automatically connect or ask the user for approval depending on whether the user has approved it before.
   */
  componentDidMount() {
    this.props.fetchGroup();
    this.props.fetchClaims();
    this.props.connectWeb3();
  }

  /**
   * @summary When the dashboard component is unmounted, we will make sure to remove the 'accountsChanged' listener
   * as we no longer care about the current state of the ethereum object.
   * Since we don't need a callback to handle any side-effects, we send null;
   */
  componentWillUnmount() {
    window.ethereum.removeListeners("accountsChanged", null);
  }
  /**
   * @summary This function will attach an event listener to the global ethereum objected injected by Metamask (and other modern dApp browsers).
   * To call the redux action creator web3 function everything there's a change in the accounts.
   * This will be triggered both when the user first enables metamask(via connect)
   * and when the user switches accounts, i.e from account 1 to account 2
   * @access global access (to ethereum window object)
   */
  startEthereumListener = () => {
    window.ethereum.addListener("accountsChanged", () => {
      this.props.connectWeb3();
    });
  };

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <Navigation />
          <Loader />
        </div>
      );
    }
    return (
      <SnackbarProvider maxSnack={3}>
        <div className={classes.root}>
          <CssBaseline />
          <Navigation />
          <Switch>
            <Route path="/admin/payments" component={Payments} />
            <Route path="/admin/profile" component={Profile} />
            <Route path="/admin/groups" component={Group} />
            <Route path="/admin/wallet" component={Wallet} />
            <Route path="/admin/claims" component={Claims} />
            <Route exact path="/admin/help" component={Help} />
          </Switch>
        </div>
      </SnackbarProvider>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}
export default connect(
  mapStateToProps,
  actions
)(withStyles(styles, { withTheme: true })(Dashboard));
