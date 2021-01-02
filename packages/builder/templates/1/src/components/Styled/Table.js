import {
  TableHeaderCell as HeaderCell,
  TableCell as Cell,
  Table,
  TableHeader,
  TableBody,
  TableRow,
} from "semantic-ui-react";
import { styled } from "../../utils/style";

const TableHeaderCell = styled(HeaderCell)`
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
`;

const TableCell = styled(Cell)`
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
`;

export { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell };
