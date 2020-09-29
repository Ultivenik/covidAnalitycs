import React from 'react'
import './img-modules.css'
import heartRecovery from './hearth-recovery.png'
import { Component } from 'react'

export default class HeartRecovery extends Component{
    render(){
        return <img src={heartRecovery} alt="icone guérisons"/>
    }
}