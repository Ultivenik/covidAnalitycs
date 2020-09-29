import React, { Component } from 'react'
import './SearchBar.css'

export default class SearchBar extends Component{
    render(){
        return(
                <div className="ui form fluid">
                <div className="ui header fluid center aligned grid">
                    <div className="ui large column fourteen wide column">
                        <form className="ui container icon input " onSubmit={this.props.submit} autoSave="off">
                            <input
                                inputMode="search"
                                required="required"
                                autoComplete="off"
                                type="text"
                                onChange={this.props.value}
                                id="searchbar"
                                placeholder={this.props.placeholder}
                            />
                            <i className="cancel link icon" onClick={this.props.reset}></i>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}