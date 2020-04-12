import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChartLine from '../../components/ChartLine';

import { getAnalytics } from '../../redux/Analytics/actions';

export default () => {
  const dispatch = useDispatch();
  const { lineChartData } = useSelector((store: any) => store.analytics);

  const fetchData = useCallback(() => dispatch(getAnalytics()), [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {lineChartData.length && (
        <ChartLine
          dataKey={'month'}
          fields={['Tokyo', 'London']}
          sourceData={lineChartData}
        />
      )}
    </div>
  );
};
