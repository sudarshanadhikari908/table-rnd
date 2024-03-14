import "./styles.css";
import {
  DatePicker,
  Space,
  Select,
  DatePickerProps,
  Button,
  Table,
} from "antd";
import ProjectAddModal from "./Modal";
import { useState } from "react";
import dayjs from "dayjs";
import EditableRow from "./EditableRow";
import EditableCell from "./EditableCell";

export default function App() {
  const [openModal, setOpenModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const fixedColumns = [
    {
      title: "Line",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: () => (
        <span>
          Project Id{" "}
          <Button type="link" onClick={() => setOpenModal(true)}>
            +
          </Button>
        </span>
      ),
      dataIndex: "projectName",
      key: "projectName",
      fixed: "left",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      fixed: "left",
    },
    {
      title: "LC Code",
      dataIndex: "lcCode",
      key: "lcCode",
      fixed: "left",
    },
    {
      title: "Pay Code",
      dataIndex: "payCode",
      key: "payCode",
      fixed: "left",
    },
  ];

  const [payCycle, setPayCycle] = useState(null);
  const [dateString, setDateString] = useState(null);
  const handleSelectChange = (value: any) => {
    setPayCycle(value);
  };

  const onDateChange: DatePickerProps["onChange"] = (
    date: any,
    dateString: any,
  ) => {
    console.log(date, dateString);
    setDateString(date);
  };

  const generateColumns = () => {
    const endColumn = [
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        fixed: "right",
      },
    ];
    if (!payCycle || !dateString) return [];

    const dynamicColumns = [];
    const startDate = dayjs(
      dateString.$y + "-" + (dateString.$M + 1) + "-" + dateString.$D,
    );

    for (let i = 0; i < payCycle; i++) {
      const currentDate = startDate.subtract(i, "day");
      const title = `${currentDate.format("MMM D")} (${currentDate.format(
        "dddd",
      )})`; // Format to 'Jan 12 (Monday)', 'Feb 1 (Tuesday)', etc.
      dynamicColumns.unshift({
        title,
        editable: true,
        dataIndex: `dynamicColumn${i}`,
        key: `dynamicColumn${i}`,
      });
    }

    return [...fixedColumns, ...dynamicColumns, ...endColumn];
  };

  const tableConfig = {
    // ... other table configurations
    scroll: { x: true }, // Enable horizontal scrolling
  };

  const columns = generateColumns().map((col: any) => {
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable || col.hasOwnProperty("dynamicColumn"),
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div className="App">
      <Space>
        <Select
          placeholder="Select Holidays"
          mode="multiple"
          style={{ width: 120 }}
          onChange={() => console.log("HEy")}
          options={[
            { value: 1, label: "Sunday" },
            { value: 2, label: "Monday" },
            { value: 3, label: "Tuesday" },
            { value: 4, label: "Wednesday" },
            { value: 5, label: "Thursday" },
            { value: 6, label: "Friday" },
            { value: 7, label: "Saturday" },
          ]}
        />
        <Select
          placeholder="Select Pay Cycle"
          style={{ width: 120 }}
          onChange={handleSelectChange}
          options={[
            { value: "7", label: "Weekly" },
            { value: "30", label: "Monthly" },
            { value: "15", label: "Semimonthly" },
          ]}
        />
        <DatePicker onChange={onDateChange} />
        <Button type="primary">SAVE</Button>
      </Space>{" "}
      <Table
        columns={columns}
        components={components}
        {...tableConfig}
        dataSource={dataSource}
      />
      <ProjectAddModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
    </div>
  );
}
