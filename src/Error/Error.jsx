import React, {Component} from 'react'
import './Error.css'
import Alert from '../modules/alert.js'

export default class Error extends Component{
    render(){
        return(
            <div className="ui centered column grid">
                <div className="segment">

                <Alert />
                </div>
                <div className="row">
                    <div className="ui tertiary inverted red segment category" id="error">
                        {this.props.wrong}
                    </div>
                </div>
            </div>
        )
    }
}