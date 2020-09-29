import React from 'react'
import './img-modules.css'
import heartCases from './heart-cases.png'
import { Component } from 'react'

export default class HeartCases extends Component{
    render(){
        return <img src={heartCases} alt="icone infections"/>
    }
}
