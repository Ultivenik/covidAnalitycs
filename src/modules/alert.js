import React from 'react'
import './img-modules.css'
import alert from './alert.png'
import { Component } from 'react'

export default class Alert extends Component{
    render(){
        return <img src={alert} alt="icone guérisons"/>
    }
}