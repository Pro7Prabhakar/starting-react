import './App.css';
import pokemon from './pokemon.json';
import PropTypes from "prop-types";
import React from 'react';
import { useState } from 'react';

const PokemonRow = ({ pokemon, onSelect}) =>(
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
      <td><button 
      onClick={() => onSelect(pokemon)}>Select!</button></td>
    </tr> 
)

PokemonRow.propTypes = {
  pokemon : PropTypes.shape({
    name : PropTypes.shape({
      english : PropTypes.string.isRequired,
    }),
    type : PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect : PropTypes.func.isRequired,
};

const PokemonInfo = ({name, base}) => (  
  <div>
    <h2>{name.english}</h2>
    <table>
      {Object.keys(base).map(key => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name : PropTypes.shape({
    english : PropTypes.string.isRequired,
  }),
  base : PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  })
}

function App() {
  const [filter, filterSet] = useState("");
  const [selectedItem, selectedItemSet] = useState(null);

  return (
    <div
    style={{
      margin: 'auto',
      paddingTop: '1rem',
      width: 800,
    }} 
    >
      <h1 className="title">Pokemon Search</h1>
      <div
      style={{
        display : 'grid',
        gridTemplateColumns: '70% 30%', 
        columnGap: '1rem',
      }} 
      >
        <div>
      <input 
      value={filter} onChange={(evt) => filterSet(evt.target.value)}
      />
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {pokemon
          .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
          .slice(0, 20).map(pokemon => (
          <PokemonRow pokemon={ pokemon } key={pokemon.id} onSelect={(pokemon) => selectedItemSet(pokemon)} />
          ))}
        </tbody>
      </table>
      </div>
        {selectedItem && <PokemonInfo {...selectedItem}/>}
        </div>
    </div>
  );
}

export default App;
