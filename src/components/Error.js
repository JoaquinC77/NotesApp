import React from "react";
import { Alert } from "@material-ui/lab";

const Error = ({ msg }) => {
    return <Alert severity="error">{msg}</Alert>;
};

export default Error;
