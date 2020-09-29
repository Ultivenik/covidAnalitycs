import React, {Component} from 'react'
import './PreviousButton.css'

export default class Button extends Component{

    render(){
        return(
            <div className="ui one column centered grid" id="previousButton">
                <button className="ui primary button btn" onClick={this.props.action}>{this.props.text}</button>
            </div>
        )
    }
}