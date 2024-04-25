import propType from 'prop-type';
import './App.css';
import pokemon from './pokemon.json';
import PropTypes from "prop-types";
import React from 'react';
import { useState } from 'react';

const PokemonRow = ({ pokemon, onSelect}) =>(
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
      <td><button>Select</button></td>
    </tr> 
)

PokemonRow.propTypes = {
  pokemon : PropTypes.shape({
    name : PropTypes.shape({
      english : PropTypes.string,
    }),
    type : PropTypes.arrayOf(PropTypes.string),
  }),
  onSelect : PropTypes.func,
}

function App() {
  const [filter, filterSet] = useState("");
  const [selectedItems, selectedItemsSet] = useState(null);

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
          <PokemonRow pokemon={ pokemon } key={pokemon.id} />
          ))}
        </tbody>
      </table>
      </div>
        {selectedItems && (
          <div>
          <h2>{selectedItems.name.english}</h2>
          </div>
        )}
        </div>
    </div>
  );
}

export default App;
