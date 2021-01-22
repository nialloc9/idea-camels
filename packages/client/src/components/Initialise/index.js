import React, { Component, Fragment } from "react";
import {Loader} from "../Loader";
import { connect } from "../../store";
import { onFetch as onFetchExperiments } from "../../store/actions/experiment";

class ChildComponent extends Component {

    componentDidMount() {
        const { onFetchExperiments } = this.props;

        [onFetchExperiments].forEach(func => func());
    }
    
    render() {

        const { isLoading, children } = this.props;
        
        return isLoading ? <Loader /> : <Fragment children={children} />
    }
};

const mapStateToProps = ({ account: { isFetchLoading } }) => ({ 
    isLoading: [isFetchLoading].some(o => o)
 });

export const Initialise = connect(mapStateToProps, { 
    onFetchExperiments
})(ChildComponent);
