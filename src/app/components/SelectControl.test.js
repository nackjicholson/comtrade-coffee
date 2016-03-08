import $ from 'teaspoon';
import assert from 'assert';
import React from 'react';
import { spy } from 'sinon';
import SelectControl from './SelectControl';

describe('app/components/SelectControl', () => {
  it('should render wrapper div', () => {
    const props = { id: 'base' };

    const actual = $(<SelectControl {...props} />)
      .render()
      .find('div[id=base-wrapper]')
      .length;
    const expected = 1;

    assert.equal(actual, expected, 'rendered 1 wrapper div based on baseId prop');
  });

  it('should render label with labelText prop', () => {
    const props = { id: 'base', labelText: 'test.labelText' };

    const actual = $(<SelectControl {...props} />)
      .render()
      .find('div > label[htmlFor=base-select]')
      .text();
    const expected = 'test.labelText';

    assert.equal(actual, expected, 'label rendered with text from labelText prop');
  });

  it('should render children prop within select list', () => {
    const props = { id: 'base' };

    const component = (
      <SelectControl {...props}>
        <option value="alpha.value">alpha.text</option>
        <option value="bravo.value">bravo.text</option>
        <option value="charlie.value">charlie.text</option>
      </SelectControl>
    );
    const $options = $(component)
      .render()
      .find('div > select[id=base-select] option');

    const actual = $options
      .map(optionNode => [optionNode.value, optionNode.text])
      .get();
    const expected = [
      ['alpha.value', 'alpha.text'],
      ['bravo.value', 'bravo.text'],
      ['charlie.value', 'charlie.text']
    ];

    assert.deepEqual(actual, expected, 'rendered option children within select list');
  });

  it('should be able to select a default option', () => {
    const props = { id: 'base', defaultValue: 'bravo.value' };

    const component = (
      <SelectControl {...props}>
        <option value="alpha.value">alpha.text</option>
        <option value="bravo.value">bravo.text</option>
        <option value="charlie.value">charlie.text</option>
      </SelectControl>
    );
    const $options = $(component)
      .render()
      .find('div > select[id=base-select] option');

    const checkedOption = $options
      .get()
      .find(optionNode => optionNode.selected);

    const actual = checkedOption.value;
    const expected = 'bravo.value';

    assert.equal(actual, expected, 'selected the option via defaultValue prop');
  });

  it('should handle selection changes via onSelection callback prop', () => {
    const props = { id: 'foo', onSelection: spy() };

    $(<SelectControl {...props} />)
      .render()
      .find('div > select[id=foo-select]')
      .trigger('change', { target: { value: 'bingo' } });

    assert(props.onSelection.calledOnce, 'onSelection callback prop called once');
    const actual = props.onSelection.args[0];
    const expected = ['bingo'];

    assert.deepEqual(actual, expected, 'onSelection callback called with change value');
  });
});
