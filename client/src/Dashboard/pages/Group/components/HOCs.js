import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../../actions";

export const withGroup = WrappedComponent => {
    let HasGroupComponent = props => {
        let { group } = props;

        if (group == null) {
            return <GroupLoader />;
        }

        if (group._id != null) {
            return <WrappedComponent {...props} />;
        } else {
            return <Redirect to="/admin/groups/new" />;
        }
    };

    return connect(state => state)(HasGroupComponent);
};

export const withoutGroup = WrappedComponent => {
    let GrouplessComponent = props => {
        let { group } = props;

        if (group == null) {
            return <GroupLoader />;
        }

        if (group._id == null) {
            return <WrappedComponent {...props} />;
        } else {
            return <Redirect to="/admin/groups" />;
        }
    };

    return connect(state => state)(GrouplessComponent);
};

const GroupLoader = connect(
    null,
    actions
)(props => {
    props.fetchGroup();
    return <span>Loading...</span>;
});
