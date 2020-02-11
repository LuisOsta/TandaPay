import React from "react";
import {
    Home as HomeIcon,
    Group as GroupIcon,
    AccountBalance as WalletIcon,
    FileCopy as ClaimsIcon,
    Help as HelpIcon,
    Settings as SettingIcon,
} from "@material-ui/icons";
const nav = {
    menuItems: ["Home", "Tanda Group", "User Wallet", "Group Claims"],
    itemProps: {
        Home: {
            icon: <HomeIcon />,
            url: "payments",
        },
        "Tanda Group": {
            icon: <GroupIcon />,
            url: "groups",
        },
        "User Wallet": {
            icon: <WalletIcon />,
            url: "wallet",
        },
        "Group Claims": {
            icon: <ClaimsIcon />,
            url: "claims",
        },
    },
};

const extra = {
    menuItems: ["Help", "Settings"],
    itemProps: {
        Help: {
            icon: <HelpIcon />,
            url: "help",
        },
        Settings: {
            icon: <SettingIcon />,
            url: "profile",
        },
    },
};

export { nav, extra };
