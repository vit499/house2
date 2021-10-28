import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "moment/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";

const Dpick = () => {
  const dateFormat = "YYYY/MM/DD";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY/MM";

  const customWeekStartEndFormat = (value) =>
    `${moment(value).startOf("week").format(weekFormat)} ~ ${moment(value)
      .endOf("week")
      .format(weekFormat)}`;

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <DatePicker locale={locale} defaultValue={moment()} onChange={onChange} />
      <DatePicker
        locale={locale}
        defaultValue={moment()}
        onChange={onChange}
        format={customWeekStartEndFormat}
        picker="week"
      />
      <DatePicker
        locale={locale}
        defaultValue={moment()}
        onChange={onChange}
        picker="month"
      />
      <DatePicker
        locale={locale}
        defaultValue={moment()}
        onChange={onChange}
        picker="quarter"
      />
      <DatePicker
        locale={locale}
        defaultValue={moment()}
        onChange={onChange}
        picker="year"
      />
    </div>
  );
};

export default Dpick;
