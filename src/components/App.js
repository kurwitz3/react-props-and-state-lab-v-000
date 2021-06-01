import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = (type) => {
    this.setState({
      filters: type 
    })
  }

  fetchPets = () => {
    let url = '/api/pets'
    if(this.state.filters.type !== 'all'){
      url += `?type=${this.state.filters.type}`
    }
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({pets: json}))
  }

  adoptPet = (id) => {
    this.state.pets.filter(pet => {
      if(pet.id === id){
        isAdopted = true
      }
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
