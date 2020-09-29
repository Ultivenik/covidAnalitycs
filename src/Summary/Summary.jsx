import React, {Component} from 'react'
import './Summary.css'

export default class Summary extends Component{
    render(){
        return(
            <div className="ui centered  grid">
                <div className="summary">
                    <h1>{this.props.title}</h1>
                </div>
            </div>
        )
    }
}