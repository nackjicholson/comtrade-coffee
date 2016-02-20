function comtradeCoffee(React) {
  function ComtradeCoffee({ greeting = 'Hello', message = 'World!' } = {}) {
    return <h1>{greeting}, {message}</h1>;
  }

  return ComtradeCoffee;
}

export default comtradeCoffee;
