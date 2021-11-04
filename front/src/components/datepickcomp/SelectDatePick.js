import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import moment from "moment";
import "moment/locale/ru";
// import locale from "antd/es/date-picker/locale/ru_RU";
import PickerWithType from "./PickerWithType";
import dateStore from "../../store/dateStore";

const { Option } = Select;

const SelectDatePick = () => {
  const [type, setType] = useState("week");
  const [date, setDate] = useState(new Date());

  function changeType(value) {
    // console.log("date, type", date.toISOString(), value);
    setType(value);
  }
  function changePick(value) {
    // console.log(value);
    const d = moment(value);
    // console.log("date, type", d.toISOString(), type);
    setDate(d);
  }
  useEffect(() => {
    console.log("date, type", date.toISOString(), type);
    dateStore.setDate(date, type);
  }, [type, date]);

  return (
    <Space>
      <Select value={type} onChange={changeType}>
        <Option value="date">день</Option>
        <Option value="week">неделя</Option>
        <Option value="month">месяц</Option>
        <Option value="quarter">квартал</Option>
        <Option value="year">год</Option>
      </Select>
      <PickerWithType type={type} date={date} onChange={changePick} />
    </Space>
  );
};

export default SelectDatePick;
