import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const NDVIChart = (props) => {
  const { data, activeLayerIndex } = props;
  const [dotsData, setDotsData] = useState([{ x: 0, y: 0 }]);
  const [activeDotPosition, setActiveDotPosition] = useState({ x: 0, y: 0 });

  if (activeDotPosition != dotsData[activeLayerIndex]) {
    setActiveDotPosition(dotsData[activeLayerIndex]);
  }

  // useEffect(() => {
  //   setActiveDotPosition(dotsData[activeLayerIndex]);
  // }, [activeLayerIndex]);

  const getDotsData = () => {
    const dotsList = [];
    const dots = document.querySelectorAll('.recharts-dot');
    if (dots.length) {
      Array.from(dots).map((item) => {
        dotsList.push({ x: parseInt(item.getAttribute('cx'), 10) * -1, y: parseInt(item.getAttribute('cy'), 10) * -1 });
      });
      setDotsData(dotsList);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">NDVI : {data[activeLayerIndex].ndvi}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer
      width="90%"
      height={300}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          content={<CustomTooltip />}
          cursor={false}
          isAnimationActive={true}
          active={true}
          position={{ x: 0 - dotsData[activeLayerIndex].x, y: 0 - dotsData[activeLayerIndex].y }}
        />
        <Legend />
        <Line
          onAnimationEnd={() => {
            getDotsData();
          }}
          type="monotone"
          dataKey="ndvi"
          stroke="#8884d8"
          dot={true}
          activeDot={{ r: 8, fill: '#8884d8', stroke: '#fff' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NDVIChart;
