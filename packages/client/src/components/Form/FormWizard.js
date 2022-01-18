import React, { Component } from "react";
import PropTypes from "prop-types";

export class FormWizard extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        forms: PropTypes.arrayOf(PropTypes.shape({
            form: PropTypes.any.isRequired,
            index: PropTypes.number.isRequired,
            onSubmit: PropTypes.func.isRequired,
            props: PropTypes.shape({})
        })).isRequired
    };

    static defaultProps = {
        index: 0
    }

    findSelectedForm = () => {
        const { forms, index } = this.props;

        return forms.find(o => o.index === index)
    }

    render() {
        const { index, forms, ...rest } = this.props;
        
        const { form: Form, props } = this.findSelectedForm()
        
        return <Form {...rest} {...props} formIndexSelected={index} maxIndex={forms.length}  />
    }
};

export class ControledFormWizard extends Component {
    static propTypes = {
        forms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        initialIndex: PropTypes.number
    };

    static defaultProps = {
        initialIndex: 0
    }

    constructor(props) {
        super(props);

        this.state = {
            index: props.initialIndex
        };
    }

    setIndex = index => this.setState({ index })

    onSelectPreviousForm = () => this.setState(({ index }) => ({ index: index === 0 ? 0 : index - 1}))

    onSelectNextForm = () => this.setState(({ index }) => ({ index: index === this.props.maxIndex ? index : index + 1}))

    render() {
        const { forms, ...rest } = this.props;
        const { index } = this.state;
        
        return <FormWizard index={index} forms={forms} {...rest} onSelectPreviousForm={this.onSelectPreviousForm} onSelectNextForm={this.onSelectNextForm}  />
    }
};