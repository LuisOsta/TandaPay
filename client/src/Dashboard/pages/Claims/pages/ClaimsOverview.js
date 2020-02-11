import React from "react";
import { Typography } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../../../actions/index";
import styles from "../claims.style";
import { RecentClaims } from "../components/";
import { PageHeader, Table as ClaimTable } from "../../../components/";
import { headRows } from "./data";
class Claims extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topClaims: []
    };
  }
  async componentDidMount() {
    await this.props.fetchClaims();
    const topClaims = this.getTopClaims();
    this.setState({
      topClaims
    });
  }
  render() {
    const { user, claims } = this.props;
    const { topClaims } = this.state;
    const headerText =
      user.role === "secretary" ? "Recent Claims" : "My Claims";
    const headerButtons = [
      { text: "NEW CLAIM", type: "green", url: "/admin/claims/new" }
    ];
    return (
      <React.Fragment>
        <PageHeader
          title={
            claims[0] === undefined
              ? "Group Claims"
              : `${claims[0].groupName} Claims`
          }
          buttons={headerButtons}
        />
        <Typography variant="h4">{headerText}</Typography>
        <RecentClaims claims={topClaims} />

        <ClaimTable
          data={claims}
          headRows={headRows}
          title="All Claims"
          type="claims"
        />
      </React.Fragment>
    );
  }

  /**
   * @summary it will sort the group claims by the date created, and then if the user is a secretary show the top 4 most recent claims.
   * Or if the user is a policyholder then it will show their top 4 most recent claims(instead of the group's most recent)
   */
  getTopClaims = () => {
    const { claims, user } = this.props;
    if (claims === undefined || user === undefined) {
      return [];
    }
    //sorts by whichever one is the most recent
    const sortedClaims = claims.sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );

    //filter by the user's id if they're a policyholder
    if (user.role === "policyholder") {
      const userTop = sortedClaims
        .filter(claim => claim.creatorID === user.sub)
        .splice(0, 4);
      return userTop;
    } else if (user.role === "secretary") {
      const sortedTop = sortedClaims.slice(0, 4);
      return sortedTop;
    } else {
      return [];
    }
  };
}
function mapStateToProps({ claims, user }) {
  return { claims, user };
}
export default connect(
  mapStateToProps,
  actions
)(withStyles(styles, { withTheme: true })(Claims));
