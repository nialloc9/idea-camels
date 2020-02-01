import React, { Component } from "react";
import { Input } from "components/Input";
import { withEnterKey } from "utils/utils";
import { handleEvent } from "utils/analytics";

export default class EmailSignUp extends Component {

    state = {
        email: ""
    };

    handleChange = (e, { value }) => this.setState({ email: value });

    handleClick = () => {
        const { email } = this.state;
        console.log(email);
        handleEvent("email-sign-up");
    };

    render() {
        return (
            <Input
                fluid
                placeholder="Enter your email"
                type="email"
                onChange={this.handleChange}
                onKeyUp={withEnterKey(this.state.email, this.handleClick)}
                action={{
                    type: "button",
                    content: "Sign up",
                    onClick: this.handleClick
                }}
            />
        );
    }
}
