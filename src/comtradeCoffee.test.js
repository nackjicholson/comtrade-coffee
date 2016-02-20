import $ from 'teaspoon';
import assert from 'assert';
import React from 'react';
import comtradeCoffee from './comtradeCoffee';

function createComponent(customProps = {}) {
  const props = Object.assign({}, customProps);
  const ComtradeCoffee = comtradeCoffee(React);
  return <ComtradeCoffee {...props} />;
}

describe('ComtradeCoffee', () => {
  it('should render Hello, World! h1 by default', () => {
    const component = createComponent();
    const actual = $(component)
      .render()
      .find('h1')
      .text();
    const expected = 'Hello, World!';

    assert.equal(actual, expected, 'rendered greeting using default props');
  });

  it('should render custom greeting prop', () => {
    const props = { greeting: 'test.greeting' };
    const component = createComponent(props);

    const actual = $(component)
      .render()
      .find('h1')
      .text();
    const expected = 'test.greeting, World!';

    assert.equal(actual, expected, 'rendered greeting with custom greeting prop');
  });

  it('should render custom message prop', () => {
    const props = { message: 'test.message' };
    const component = createComponent(props);

    const actual = $(component)
      .render()
      .find('h1')
      .text();
    const expected = 'Hello, test.message';

    assert.equal(actual, expected, 'rendered greeting with custom message prop');
  });
});
