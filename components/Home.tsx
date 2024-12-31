import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
} from 'chart.js';
import DashboardLayout from './DashboardLayout';
import './css/Home.css';
import BackgroundAnimation from './BackgroundAnimation';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketShare: string;
  icon: string;
}

const dummyData: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 95786.76,
    change24h: 2.6,
    volume: 28000000000,
    marketShare: '37%',
    icon: '₿'
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    change24h: -3.1,
    volume: 82000000000,
    marketShare: '23%',
    icon: '₮'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3476.90,
    change24h: -1.2,
    volume: 15000000000,
    marketShare: '20%',
    icon: 'Ξ'
  },
  {
    id: 'ripple',
    name: 'Ripple',
    symbol: 'XRP',
    price: 0.58,
    change24h: 3.5,
    volume: 2800000000,
    marketShare: '17%',
    icon: '✕'
  }
];

const Home: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(dummyData[0]);
  const [timeframe, setTimeframe] = useState('1d');
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const generateChartData = () => {
      const labels = Array.from({ length: 24 }, (_, i) => 
        `${(20 + Math.floor(i / 2)).toString().padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`
      );

      const basePrice = selectedCrypto.price;
      const priceData = labels.map(() => 
        basePrice + (Math.random() - 0.5) * basePrice * 0.1
      );

      const volumeData = labels.map(() => 
        Math.random() * 1000000
      );

      return {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Price',
            data: priceData,
            borderColor: '#7B3FE4',
            backgroundColor: 'rgba(123, 63, 228, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
            yAxisID: 'y'
          },
          {
            type: 'bar',
            label: 'Volume',
            data: volumeData,
            backgroundColor: 'rgba(123, 63, 228, 0.2)',
            borderRadius: 4,
            yAxisID: 'y1'
          }
        ]
      };
    };

    setChartData(generateChartData());
  }, [selectedCrypto, timeframe]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(23, 23, 23, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 12
          },
          maxRotation: 0
        }
      },
      y: {
        position: 'right' as const,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 12
          },
          callback: (value: number) => `$${value.toLocaleString()}`
        }
      },
      y1: {
        position: 'left' as const,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      }
    }
  };

  return (
    <DashboardLayout>
        <BackgroundAnimation />
      <div className="home-container">
        <div className="dashboard-header">
          <h1>REAL TIME UPDATES</h1>
        </div>
        
        <div className="dashboard-grid">
          <div className="coins-panel">
            <div className="panel-header">
              <h2>Coins</h2>
              <button className="more-button">•••</button>
            </div>
            
            <div className="coins-list">
              {dummyData.map((crypto) => (
                <div 
                  key={crypto.id}
                  className={`coin-item ${selectedCrypto.id === crypto.id ? 'active' : ''}`}
                  onClick={() => setSelectedCrypto(crypto)}
                >
                  <div className={`coin-icon ${crypto.symbol.toLowerCase()}`}>
                    {crypto.icon}
                  </div>
                  <div className="coin-info">
                    <div className="coin-main">
                      <span className="coin-name">{crypto.name}</span>
                      <span className="coin-symbol">{crypto.symbol}</span>
                    </div>
                    <div className="coin-details">
                      <span className="market-share">{crypto.marketShare}</span>
                      <span className={`price-change ${crypto.change24h >= 0 ? 'positive' : 'negative'}`}>
                        {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-panel">
            <div className="chart-header">
              <div className="chart-info">
                <div className="chart-title">
                  <span>{selectedCrypto.name}/BTC</span>
                  <div className="price-tag">
                    ${selectedCrypto.price.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="chart-controls">
                <div className="timeframe-selector">
                  {['1h', '3h', '1d', '1w', '1m'].map((period) => (
                    <button
                      key={period}
                      className={`timeframe-button ${timeframe === period ? 'active' : ''}`}
                      onClick={() => setTimeframe(period)}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="chart-container">
              {chartData && <Line data={chartData} options={chartOptions} />}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
