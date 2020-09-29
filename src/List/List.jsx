import React, {Component} from 'react';
import "./List.css"
import HeartCases from '../modules/heartCases'
import HeartDeath from '../modules/heartDeath'
import HeartRecovery from '../modules/heartRecovery'

export default class List extends Component{
    render(){
        return(
            <div className="centered equal segment width one column" id="itemSection">
                <div className="stretched">
                    <div className="two column centered stackable ui grid">
                        <div className="ui segment column center aligned">
                            <h3>{this.props.list.country}</h3>
                            <div className="value">
                                <h3>{this.props.list.continent}</h3>
                                <h3>{this.props.titleList.pop}: {this.props.list.population.toLocaleString('fr')}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="ui centered equal width five column grid">
                        <div className="stretched one column">
                            <div className="four column centered stackable ui grid">
                                <div className="ui column center aligned">
                                    <div className="ui segment shadow deathSection">
                                        <HeartDeath />
                                        <ul>
                                            <li>{this.props.titleList.totalDeath}: {this.props.list.deaths.total.toLocaleString('fr')}</li>
                                            <li>{this.props.titleList.todayDeath}: {this.props.list.deaths.new.toLocaleString('fr')}</li>
                                            <li>{this.props.titleList.deathsPerOneMillion}: {this.props.list.deaths['1M_pop'].toLocaleString('fr')}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="ui column center aligned">
                                    <div className="ui segment shadow casesSection">
                                        <HeartCases />
                                        <ul>
                                            <li>{this.props.titleList.totalCases}: {this.props.list.cases.total.toLocaleString('fr')}</li>
                                            <li>{this.props.titleList.todayCases}: {this.props.list.cases.new.toLocaleString('fr')}</li>
                                            <li>{this.props.titleList.casesPerOneMillion}: {this.props.list.cases['1M_pop'].toLocaleString('fr')}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="ui column center aligned">
                                    <div className="ui segment shadow recoveredSection">
                                        <HeartRecovery />
                                        <ul>
                                            <li>{this.props.titleList.recovered}: {this.props.list.cases.recovered.toLocaleString('fr')}</li>
                                            <li>{this.props.titleList.active}: {this.props.list.cases.active.toLocaleString('fr')}</li>
                                            <li>{this.props.titleList.critical}: {this.props.list.cases.critical.toLocaleString('fr')}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui center aligned equal width four column grid">
                        <div className="ui segment shadow testSection">
                            <div className="column">
                                <h3>{this.props.titleList.tests}: {this.props.list.tests.total.toLocaleString('fr')}</h3>
                                <h3>{this.props.titleList.testsPerOneMillion}: {this.props.list.tests['1M_pop'].toLocaleString('fr')}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}