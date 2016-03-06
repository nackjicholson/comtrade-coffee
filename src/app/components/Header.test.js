import $ from 'teaspoon';
import assert from 'assert';
import React from 'react';
import Header from './Header';

describe('app/components/Header', () => {
  it('should be wrapper div#header', () => {
    const $elements = $(<Header />).render();
    const actual = $elements.find('div').props('id');
    const expected = 'header';

    assert.equal(actual, expected, 'displays div#header');
  });

  it('should display h1 with title', () => {
    const actual = $(<Header />)
      .render()
      .find('h1')
      .length;
    const expected = 1;

    assert.equal(actual, expected, 'rendered 1 h1 title');
  });

  it('should display description p tag', () => {
    const actual = $(<Header />)
      .render()
      .find('p')
      .length;
    const expected = 1;

    assert.equal(actual, expected, 'rendered 1 p tag');
  });
});
