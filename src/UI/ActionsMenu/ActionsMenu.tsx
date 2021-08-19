import React from 'react';
import { IconButton, Menu } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

interface Props {
  children: JSX.Element | JSX.Element[];
}
export function ActionsMenu({ children }: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => { setAnchorEl(event.currentTarget); };

  const handleClose = () => { setAnchorEl(null); };

  return (
    <div>
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </div>
  );
}