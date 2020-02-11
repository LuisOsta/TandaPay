import React from "react";
import { connect } from "react-redux";

import { Myself, Subgroup, Members } from "./components";
import { PageHeader } from "../../../../components/";
import * as actions from "../../../../../actions";

const GroupDashboard = connect(
    mapStateToProps,
    actions
)(props => {
    let { group } = props;

    if (!group) {
        props.fetchGroup();
        return "Loading...";
    }

    return (
        <React.Fragment>
            <PageHeader
                title={group.groupName + " Members"}
                buttons={[
                    {
                        text: "Invite Member",
                        role: "secretary",
                        type: "blue",
                        url: "/admin/groups/invite"
                    }
                ]}
            />
            <Myself />
            <Subgroup />
            <Members />
        </React.Fragment>
    );
});

function mapStateToProps({ group }) {
    return { group };
}

export default GroupDashboard;
