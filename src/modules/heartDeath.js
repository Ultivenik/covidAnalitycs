import React from 'react'
import './img-modules.css'
import heartDeath from './heart-death.png'
import { Component } from 'react'

export default class HeartDeath extends Component{
    render(){
        return <img src={heartDeath} alt="icone décès"/>
    }
}
