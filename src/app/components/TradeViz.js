import React from 'react';
import Griddle from 'griddle-react';
import { Treemap } from 'react-d3';

function TradeViz({ tradeData }) {
  // Show the visualizations if data is not fetching
  if (!tradeData.isFetching) {
    return (
      <div>
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
        <h4>Raw Data from Comtrade API</h4>
        <Griddle
          results={tradeData.data.raw}
          resultsPerPage="50"
          columns={['rtTitle', 'TradeValue', 'TradeQuantity']}
        />
        <p>
          Last Updated: {tradeData.lastUpdated && new Date(tradeData.lastUpdated).toISOString()}
        </p>
      </div>
    );
  }

  // But if the tradeData is fetching show a spinning UN badge.
  return <img src="/images/un_loader.gif" width="60" height="60" />;
}

export default TradeViz;
