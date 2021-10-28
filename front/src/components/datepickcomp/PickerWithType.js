import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "moment/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";

function PickerWithType({ type, date, onChange }) {
  const weekFormat = "MM/DD";
  const customWeekStartEndFormat = (value) =>
    `${moment(value).startOf("week").format(weekFormat)} ~ ${moment(value)
      .endOf("week")
      .format(weekFormat)}`;

  if (type === "date")
    return (
      <DatePicker locale={locale} defaultValue={moment()} onChange={onChange} />
    );
  else if (type === "week")
    return (
      <DatePicker
        locale={locale}
        defaultValue={moment(date)}
        onChange={onChange}
        format={customWeekStartEndFormat}
        picker="week"
      />
    );
  else if (type === "month")
    return (
      <DatePicker
        locale={locale}
        defaultValue={moment(date)}
        onChange={onChange}
        picker="month"
      />
    );
  else if (type === "quarter")
    return (
      <DatePicker
        locale={locale}
        defaultValue={moment(date)}
        onChange={onChange}
        picker="quarter"
      />
    );
  else if (type === "year")
    return (
      <DatePicker
        locale={locale}
        defaultValue={moment(date)}
        onChange={onChange}
        picker="year"
      />
    );
  return <DatePicker picker={type} onChange={onChange} />;
}

export default PickerWithType;
