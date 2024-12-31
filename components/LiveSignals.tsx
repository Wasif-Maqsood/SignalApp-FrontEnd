import React from 'react';
import './css/LiveSignals.css';

const LiveSignals: React.FC = () => {
  const signals = [
    {
      coin: 'BTC',
      name: 'Bitcoin',
      buyingPrice: '$94123.24',
      sellingPrice: '$96123.24',
      stopLoss: '$93450.23',
      takeProfit1: '$94450.23',
      takeProfit2: '$96123.23'
    },
    {
      coin: 'ETH',
      name: 'Ethereum',
      buyingPrice: '$3476.90',
      sellingPrice: '$3706.78',
      stopLoss: '$3350.50',
      takeProfit1: '$3650.60',
      takeProfit2: '$3706.78'
    },
    {
      coin: 'SOL',
      name: 'Solana',
      buyingPrice: '$190.58',
      sellingPrice: '$250.68',
      stopLoss: '$150.65',
      takeProfit1: '$220.50',
      takeProfit2: '$250.68'
    }
  ];

  return (
    <section className="live-signals">
      <h2>LIVE SIGNALS</h2>
      <div className="signals-table-container">
        <table className="signals-table">
          <thead>
            <tr>
              <th>Coin Name</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Stoploss</th>
              <th>Take Profit 1</th>
              <th>Take Profit 2</th>
            </tr>
          </thead>
          <tbody>
            {[...signals, ...signals, ...signals].map((signal, index) => (
              <tr key={index}>
                <td>
                  <div className="coin-cell">
                    <div className={`coin-icon ${signal.coin.toLowerCase()}`}>
                      {signal.coin === 'BTC' && <span className="bitcoin-icon">₿</span>}
                      {signal.coin === 'ETH' && <span className="eth-icon">Ξ</span>}
                      {signal.coin === 'SOL' && <span className="sol-icon">◎</span>}
                    </div>
                    <div className="coin-info">
                      <span className="coin-symbol">{signal.coin}</span>
                      <span className="coin-name">{signal.name}</span>
                    </div>
                  </div>
                </td>
                <td>{signal.buyingPrice}</td>
                <td>{signal.sellingPrice}</td>
                <td>{signal.stopLoss}</td>
                <td>{signal.takeProfit1}</td>
                <td>{signal.takeProfit2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LiveSignals;
