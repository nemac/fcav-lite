import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Dummy data for the chart
const data = [
  { name: '20000108', pv: 2400, amt: 2400 },
  { name: '20000116', pv: 1398, amt: 2210 },
  { name: '20000124', pv: 9800, amt: 2290 },
  { name: '20000201', pv: 3908, amt: 2000 },
  { name: '20000209', pv: 4800, amt: 2181 },
  { name: '20000217', pv: 3800, amt: 2500 },
  { name: '20000225', pv: 4300, amt: 2100 },
];
const NDVIChart = (props) => {
  const { ndviData } = props;
  return (
    <LineChart width={2000} height={300} data={ndviData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="ndvi" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default NDVIChart;
