import React from 'react';
import { Treemap } from 'react-d3';
import Griddle from 'griddle-react';

function ChartPanel({ tradeData }) {
  // The loader gif is a span that just takes up space by default.
  let loaderGif = <span style={{ height: 30, display: 'block' }} />;

  // But if the tradeData.isFetching show a spinning UN badge.
  if (tradeData.isFetching) {
    loaderGif = <img src="/images/un_loader.gif" width="30" height="30" />;
  }

  return (
    <div>
      {loaderGif}
      <Treemap
        data={tradeData.data.valueTreemap}
        width={1000}
        height={300}
        textColor="#484848"
        title="Trade Value ($USD) by Partner 2015"
      />
      <Treemap
        data={tradeData.data.quantityTreemap}
        width={1000}
        height={300}
        textColor="#484848"
        title="Trade Quantity (Kg) by Partner 2015"
      />

      <h3>Raw Data from Comtrade API</h3>
      <Griddle
        results={tradeData.data.raw}
        resultsPerPage="50"
        columns={['rtTitle', 'TradeValue', 'TradeQuantity']}
      />
    </div>
  );
}

export default ChartPanel;
