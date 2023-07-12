import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_GAMES } from '../utils/queries';

const GamesDropdown = ({ name, value, onChange }) => {
  const { loading, error, data } = useQuery(GET_GAMES);

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error loading games: {error.message}</p>;

  return (
    <select className="form-control" name={name} value={value} onChange={onChange}>
      <option value="">Select a game</option>
      {data.games.map((game) => (
        <option key={game._id} value={game._id}>
          {game.title}
        </option>
      ))}
    </select>
  );
};

export default GamesDropdown;