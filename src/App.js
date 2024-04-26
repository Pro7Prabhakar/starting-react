import './App.css';
import PropTypes from "prop-types";
import React from 'react';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display : grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  padding-top: 1rem;
  width: 800px;
`;

const Input = styled.input`
  width: 100%;
  font-size: large;
  padding: 0.2rem;
`;

const Table = styled.table`
  width : 100%;
`;

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
  const [pokemon, pokemonSet] = useState([]);

  useEffect(() => {return () => {
      fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((res) => res.json())
      .then((data) => pokemonSet(data));
    }
  }, []);
  

  return (
    <Container>
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
      <Input 
      value={filter} onChange={(evt) => filterSet(evt.target.value)}
      />
      <Table>
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
      </Table>
      </div>
        {selectedItem && <PokemonInfo {...selectedItem}/>}
        </TwoColumnLayout>
    </Container>
  );
}

export default App;
