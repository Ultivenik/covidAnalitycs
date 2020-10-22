import React, { Component } from 'react'
import ReactDOM from "react-dom"
import axios from 'axios'
import Summary from './Summary/Summary'
import Global from './Global/Global'
import List from './List/List'
import SearchBar from './SearchBar/SearchBar'
import Button from './Button/Button'
import Error from './Error/Error'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCountry:'',
            country: '',
            resultDatas : '',
            search: false,
            whiteList: [],
            error: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onResetField = this.onResetField.bind(this)
        this.fillWhiteList()
    }

    //white list function to forbid all special characters
    fillWhiteList() {
        axios.get('https://covid-193.p.rapidapi.com/statistics', {
            "method":"GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            }
        })
        .then(list => {
            const resultList =  list.data.response
            const theList = resultList.map(theList => theList.country.toLowerCase())
            this.setState({
                whiteList: theList
            })
        })

    }

    //handle the value of the text field and keep letter in lower case
    //deletion of white space in typing to not generate errors
    //async to have the last letter of the value
    handleChange = function(e) {
        this.setState({
            country: e.target.value.toLowerCase().trim()
        })
    }

    //Call API function and data table recovery with 'resultDatas' state
    handleSubmit = (e) => {
        if (this.state.whiteList.includes(this.state.country)) {
            e.preventDefault()
            axios.get(`https://covid-193.p.rapidapi.com/statistics?country=${this.state.country}`, {
                "method":"GET",
                "headers": {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "ecb8db3264mshce9a7d52396a247p1ba298jsn5e8e6bcd9983"
                }
            })
            .then( res => {
                const response = res.data.response[0]
                //replace Null value to 0
                function changeNullToZero(object) {
                    for (const [key, value] of Object.entries(object)) {
                        if (typeof(value) === 'object' && value !== null) {
                            changeNullToZero(value)
                        }else if(!value){
                            object[key] = 0
                        }
                    }
                    return object
                }
                changeNullToZero(response)
                this.setState({
                    currentCountry: this.state.country,
                    resultDatas:response,
                    search: true,
                })
            })
        }else{
            e.preventDefault()
            axios.get(`https://covid-193.p.rapidapi.com/statistics?country=${this.state.country}`, {
                "method":"GET",
                "headers": {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "ecb8db3264mshce9a7d52396a247p1ba298jsn5e8e6bcd9983"
                }
            })
            .then( res => {
                const response = res.data.response[0]
                const error = res.data.results
                this.setState({
                    currentCountry: this.state.country,
                    resultDatas:response,
                    search: true,
                    error:error
                })
            })
        }
        this.onResetField()
    }

    //Home button function
    handleClick() {
        this.setState({
            resultDatas : '',
            search: false,
            country: ''
        })
    }

//clear input function when onClick in the cross icon
    onResetField() {
        const iconReset = document.querySelector('input')
        iconReset.value = ''
    }

    render(){
        const itemList ={
            pop: "Population",
            totalCases: "Cas totaux",
            todayCases:"Cas aujourd'hui",
            totalDeath: "Décès total",
            todayDeath: "Décès aujourd'hui",
            recovered:"Rétablis",
            critical:"Critiques",
            active:"Actifs",
            casesPerOneMillion:"Cas pour 1M de personnes",
            deathsPerOneMillion: "Décès pour 1M de personnes",
            tests:"Tests effectués",
            testsPerOneMillion:"Tests sur 1M de personnes",
        }
        // Home page display when no value is submitted
        if (this.state.search === false || this.state.resultDatas === '') {
            return (
                <div>
                    <Summary title="CovidAnalytics" />
                    <SearchBar
                        reset={this.onResetField}
                        value={this.handleChange}
                        submit={this.handleSubmit}
                        placeholder="Rechercher par pays"
                        />
                    <Global
                        loading="Veuillez patienter..."
                        deathGlobal="Décès"
                        today="Aujourd'hui"
                        global="Mondial"
                        recoveryGlobal="Rétablis"
                        todayRecovery="Rétablis aujourd'hui"
                        forOneMillion="Pour un million de personnes aujourd'hui"
                        casesGlobal="Cas d'infection"
                        criticalGlobal="Cas critiques"
                        activeGlobal="Actif"
                    />
                </div>
            )
        //Error display
        }else if (!this.state.whiteList.includes(this.state.currentCountry) && this.state.error !== 1) {
           return(
               <div>
                   <Summary title="CovidAnalytics" />
                   <SearchBar
                       reset={this.onResetField}
                       submit={this.handleSubmit}
                       value={this.handleChange}
                       placeholder="Rechercher par pays"
                   />
                   <Error
                        wrong="Le pays recherché est introuvable, n'as pas été atteint par la pandémie
                         ou n'as pas été tapé en ANGLAIS. Veuillez recommencer la recherche."
                   />
                   <Button
                        action={this.handleClick}
                        text="Revenir à l'accueil"
                   />
               </div>
           )
        // Country display
        }else{
            return(
                <div>
                    <Summary title="CovidAnalytics" />
                    <SearchBar
                        reset={this.onResetField}
                        submit={this.handleSubmit}
                        value={this.handleChange}
                        placeholder="Rechercher par pays"
                    />
                    <Button
                        action={this.handleClick}
                        text="Revenir à l'accueil"
                    />
                    <List
                        list={this.state.resultDatas}
                        titleList={itemList}
                    />
                </div>
            )
        }
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'))
