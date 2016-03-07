import $ from 'teaspoon';
import assert from 'assert';
import noop from 'lodash.noop';
import React from 'react';
import { App } from './App';
import Header from '../components/Header';
import SelectControl from '../components/SelectControl';
import TradeViz from '../components/TradeViz';

function createProps(props = {}) {
  const defaultProps = {
    partnerAreas: { selectedId: 'foo', results: [] },
    tradeRegimes: { selectedId: 'bar', results: [] }
  };
  return Object.assign({}, defaultProps, props);
}

describe('app/containers/App', () => {
  it('should render Header component', () => {
    const props = createProps();
    const $header = $(<App {...props} />)
      .shallowRender()
      .find($.s`div > ${Header}`);

    const actual = $header.length;
    const expected = 1;

    assert.equal(actual, expected, 'Header component is rendered');
  });

  it('should delegate to partner areas SelectControl', () => {
    const props = createProps({
      partnerAreas: {
        selectedId: 'test.selectedId',
        results: [
          { id: 'alpha.id', text: 'alpha.text' },
          { id: 'bravo.id', text: 'bravo.text' },
          { id: 'charlie.id', text: 'charlie.text' }
        ]
      },
      selectPartnerArea: noop
    });

    const $select = $(<App {...props} />)
      .shallowRender()
      .find($.s`div > form > ${SelectControl}[id=partner-area]`);

    const actualDefaultValue = $select.props('defaultValue');
    const expectedDefaultValue = 'test.selectedId';

    assert.equal(
      actualDefaultValue,
      expectedDefaultValue,
      'passed partnerAreas.selectedId as defaultValue prop to SelectControl'
    );

    const actualOnSelection = $select.props('onSelection');
    const expectedOnSelection = noop;

    assert.equal(
      actualOnSelection,
      expectedOnSelection,
      'passed selectPartnerArea prop as onSelection prop to SelectControl'
    );

    const actualChildren = $select.props('children');
    const expectedChildren = [
      <option key="0" value="alpha.id">alpha.text</option>,
      <option key="1" value="bravo.id">bravo.text</option>,
      <option key="2" value="charlie.id">charlie.text</option>
    ];

    assert.deepEqual(
      actualChildren,
      expectedChildren,
      'passes array of option built from partnerAreas as children to SelectControl'
    );
  });

  it('should delegate to trade regimes SelectControl', () => {
    const props = createProps({
      tradeRegimes: {
        selectedId: 'test.selectedId',
        results: [
          { id: 'alpha.id', text: 'alpha.text' },
          { id: 'bravo.id', text: 'bravo.text' },
          { id: 'charlie.id', text: 'charlie.text' }
        ]
      },
      selectTradeRegime: noop
    });

    const $select = $(<App {...props} />)
      .shallowRender()
      .find($.s`div > form > ${SelectControl}[id=trade-regime]`);

    const actualDefaultValue = $select.props('defaultValue');
    const expectedDefaultValue = 'test.selectedId';

    assert.equal(
      actualDefaultValue,
      expectedDefaultValue,
      'passed partnerAreas.selectedId as defaultValue prop to SelectControl'
    );

    const actualOnSelection = $select.props('onSelection');
    const expectedOnSelection = noop;

    assert.equal(
      actualOnSelection,
      expectedOnSelection,
      'passed selectTradeRegime prop as onSelection prop to SelectControl'
    );

    const actualChildren = $select.props('children');
    const expectedChildren = [
      <option key="0" value="alpha.id">alpha.text</option>,
      <option key="1" value="bravo.id">bravo.text</option>,
      <option key="2" value="charlie.id">charlie.text</option>
    ];

    assert.deepEqual(
      actualChildren,
      expectedChildren,
      'passes array of option built from tradeRegimes as children to SelectControl'
    );
  });

  it('should render TradeViz component', () => {
    const props = createProps({ tradeData: { test: 'tradeData' } });

    const $tradeViz = $(<App {...props} />)
      .shallowRender()
      .find($.s`div > ${TradeViz}`);

    const actual = $tradeViz.props();
    const expected = { tradeData: { test: 'tradeData' } };

    assert.deepEqual(
      actual,
      expected,
      'passes data as tradeData prop of TradeViz component'
    );
  });
});
