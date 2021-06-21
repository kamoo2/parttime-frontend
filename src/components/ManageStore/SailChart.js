import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 30px;
  margin: 30px 0;
`;

const ChartContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 50px 0;
`;
const SailChart = ({ chartData }) => {
  const now = new Date();
  return (
    <ChartContainer>
      <Title>{now.getMonth() + 1}월 매출차트</Title>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="일매출"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default SailChart;
