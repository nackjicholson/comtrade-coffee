import React from 'react';

function Greet({ greeting = 'Hello', message = 'World!' } = {}) {
  return <h1>{greeting}, {message}</h1>;
}

export default Greet;
