import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Message} from '../Styled/Message'

export class Warning extends PureComponent {
    static propTypes = {
        warning: PropTypes.string,
    }

    static defaultProps = {
        warning: '',
    }

    render() {
        const {warning, ...rest} = this.props

        if (warning === '') {
            return null
        }

        return (
            <Message color="yellow" textAlign="center" {...rest}>
                {warning}
            </Message>
        )
    }
}