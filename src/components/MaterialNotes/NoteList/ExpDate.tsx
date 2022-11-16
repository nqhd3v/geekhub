import { Tooltip } from "antd";
import moment from "moment";
import React from "react";

interface IExpDate {
  date: Date | undefined;
  isRemoved: boolean;
}

const ExpDate: React.FC<IExpDate> = ({ date, isRemoved }) => {
  if (!date) {
    return <span className="text-dark dark:text-light">'--'</span>;
  }

  if (isRemoved) {
    return <span className="text-dark dark:text-light" data-removed={isRemoved}>{moment(date).format('DD/MM/YYYY')}</span>;
  }

  let tooltip = '';
  if (moment(date).isBefore(moment().startOf('day'))) {
    tooltip = 'Đã hết hạn!';
  } else if (moment(date).isBefore(moment().endOf('day'))) {
    tooltip = 'Hết hạn hôm nay!';
  } else if (moment(date).isBefore(moment().add(1, 'month').endOf('day'))) {
    const diffDays = moment(date).diff(moment(), 'days');
    tooltip = `Hết hạn sau ${diffDays} ngày!`;
  } else if (moment(date).isBefore(moment().add(2, 'year').endOf('day'))) {
    const diffDays = moment(date).diff(moment(), 'months');
    tooltip = `Hết hạn sau ${diffDays} tháng!`;
  } else {
    const diffDays = moment(date).diff(moment(), 'years');
    tooltip = `Hết hạn sau ${diffDays} năm!`;
  }

  return (
    <Tooltip title={tooltip}>
      <span className="text-dark dark:text-light" data-removed={isRemoved}>{moment(date).format('DD/MM/YYYY')}</span>
    </Tooltip>
  )
}

export default ExpDate;