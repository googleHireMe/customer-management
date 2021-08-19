import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from "react";
import { Tooltip } from '@material-ui/core';
import { CustomerProfileListItem } from "../../../interfaces/customer-profile-list-item";

interface Props {
  profiles: CustomerProfileListItem[],
  editProfile: (profile: CustomerProfileListItem) => void;
  deleteProfile: (profile: CustomerProfileListItem) => void;
}
function CustomerProfilesTable(props: Props) {
  return (
    <TableContainer component={Paper}>
      {/* <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Id клиента</TableCell>
            <TableCell>Имя профиля</TableCell>
            <TableCell>Имя клиента</TableCell>
            <TableCell>Баланс</TableCell>
            <TableCell>Кредитный лимит</TableCell>
            <TableCell>Общая наценка</TableCell>
            <TableCell align="right" style={{width: '130px'}}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {props.profiles.map(profile => {
            return (
              <TableRow
                key={profile.id}
                style={{ cursor: 'pointer' }}
              >
                <TableCell onClick={() => props.editProfile(profile)}>{profile.id}</TableCell>
                <TableCell onClick={() => props.editProfile(profile)}>{profile.customerId}</TableCell>
                <TableCell onClick={() => props.editProfile(profile)}>{profile.title}</TableCell>
                <TableCell onClick={() => props.editProfile(profile)}>{profile.customerTitle}</TableCell>
                <TableCell onClick={() => props.editProfile(profile)}>{profile.balance}</TableCell>
                <TableCell onClick={() => props.editProfile(profile)}>{profile.creditLimit}</TableCell>
                <TableCell onClick={() => props.editProfile(profile)}>{profile.commonCustomerMargin}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Редактировать" placement="bottom">
                    <IconButton
                      color="default"
                      onClick={() => props.editProfile(profile)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Удалить" placement="bottom">
                    <IconButton
                      color="secondary"
                      onClick={() => props.deleteProfile(profile)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table> */}
    </TableContainer>
  );
}

export default CustomerProfilesTable;