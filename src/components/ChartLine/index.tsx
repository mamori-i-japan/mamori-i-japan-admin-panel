import React from 'react';
import { Chart, Tooltip, Axis, Legend, Line, Point } from 'viser-react';

const DataSet = require('@antv/data-set');

export default ({ dataKey, fields, sourceData }: any) => {
  const dv = new DataSet.View().source(sourceData);

  dv.transform({
    type: 'fold',
    fields,
    key: 'city',
    value: 'temperature',
  });

  const data = dv.rows;

  const scale = [
    {
      dataKey,
      min: 0,
      max: 1,
    },
  ];

  return (
    <Chart forceFit height={400} data={data} scale={scale}>
      <Tooltip />
      <Axis />
      <Legend />
      <Line position="month*temperature" color="city" />
      <Point
        position="month*temperature"
        color="city"
        size={4}
        style={{ stroke: '#fff', lineWidth: 1 }}
        shape="circle"
      />
    </Chart>
  );
};
