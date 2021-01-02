import React from "react";
import { PieChart as Chart } from "react-minimal-pie-chart";
import { Block } from "../Styled/Block";
import { Header } from "../Header";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "../Table";
import withToolTip from "../../hoc/withToolTip";

const HeaderCell = withToolTip(TableHeaderCell);

// Cannot override color in styled component so has to be inline styling
const renderTableHeader = (data) =>
  data.map(({ title, color, tooltip }) => (
    <HeaderCell
      textAlign="center"
      tooltip={tooltip}
      key={`cell-${title}`}
      style={{ color }}
    >
      {title}
    </HeaderCell>
  ));

const renderTableData = (data) =>
  data.map(({ value }) => (
    <TableCell textAlign="center" key={`cell-${value}`}>
      {value}
    </TableCell>
  ));

const DataTable = ({ data }) => (
  <Table celled centered>
    <TableHeader>
      <TableRow>{renderTableHeader(data)}</TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>{renderTableData(data)}</TableRow>
    </TableBody>
  </Table>
);

export const PieChart = ({
  title,
  data,
  width,
  headerSize,
  showTable = true,
}) => (
  <Block margin="auto" textAlign="center">
    <Block width={width} margin="auto">
      <Header size={headerSize}>{title}</Header>
      <Chart data={data} />
    </Block>

    {showTable && <DataTable data={data} />}
  </Block>
);
