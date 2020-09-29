import React, { Component } from 'react'
import axios from 'axios'
import './Global.css'
import HeartCases from './../modules/heartCases'
import HeartDeath from './../modules/heartDeath'
import HeartRecovery from './../modules/heartRecovery'

 export default class Global extends Component {
     constructor(props) {
        super(props)
        this.state = {
            item:[],
            isLoaded:false
        }
     }

    componentDidMount() {
        //requetes API pour le monde entier, affichage d'accueil
        const APICall = () => {
            axios.get('https://covid-193.p.rapidapi.com/statistics?country=all', {
                "headers": {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "ecb8db3264mshce9a7d52396a247p1ba298jsn5e8e6bcd9983"
                }
            })
            .then(res => {
                const resultWorld = res.data.response[0]
                this.setState({
                    item: resultWorld,
                    isLoaded:true
                })
            })
        }
        this.interval = setInterval(APICall(), 15 * 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        //affichage du loader si la requete n'aboutit pas.
            if (!this.state.isLoaded) {
            return (
                <div className="ui">
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">{this.props.loading}</div>
                    </div>
                </div>
           )
        }else {
            return(
                <div className="ui centered equal width">
                    <div className="stretched">
                        <div className="five column centered stackable ui grid">
                            <div className="column center aligned globalSection">
                                <div className="ui segment deathSection shadow">
                                    {/*GLOBAL DEATH CARD*/}
                                    <HeartDeath />
                                    <h2>{this.props.deathGlobal}</h2>
                                    <div className="value">
                                        <h3>{this.state.item.deaths.total.toLocaleString('fr')}</h3>
                                    </div>
                                    <div className="label">
                                        <span>{this.props.global}</span>
                                    </div>
                                    <div className="ui celled list">
                                        <div className="value">
                                            {this.props.today}: {this.state.item.deaths.new.toLocaleString('fr')}
                                        </div>
                                        <div className="label">
                                            {this.props.forOneMillion}: {this.state.item.deaths['1M_pop'].toLocaleString('fr')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*GLOBAL CASES CARD*/}
                            <div className="column globalSection">
                                <div className="ui shadow segment center aligned casesSection">
                                    <HeartCases />
                                    <h2>{this.props.casesGlobal} </h2>
                                    <div className="value">
                                        <h3>{this.state.item.cases.total.toLocaleString('fr')}</h3>
                                    </div>
                                    <div className="label">
                                        <span>{this.props.global}</span>
                                    </div>
                                    <div className="ui celled list">
                                        <div className="value">
                                            {this.props.today}: {this.state.item.cases.new.toLocaleString('fr')}
                                        </div>
                                        <div className="value">
                                            {this.props.criticalGlobal}: {this.state.item.cases.critical.toLocaleString('fr')}
                                        </div>
                                        <div className="value">
                                            {this.props.forOneMillion}: {this.state.item.cases['1M_pop'].toLocaleString('fr')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*GLOBAL RECOVERY CARD*/}
                            <div className="column globalSection">
                                <div className="ui shadow segment center aligned recoveredSection">
                                    <HeartRecovery />
                                    <h2>{this.props.recoveryGlobal}</h2>
                                    <div className="value">
                                        <h3>{this.state.item.cases.recovered.toLocaleString('fr')}</h3>
                                    </div>
                                    <div className="label">
                                        <span>{this.props.global}</span>
                                    </div>
                                    <div className="ui celled list">
                                        <div className="value">
                                            {this.props.activeGlobal}: {this.state.item.cases.active.toLocaleString('fr')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}