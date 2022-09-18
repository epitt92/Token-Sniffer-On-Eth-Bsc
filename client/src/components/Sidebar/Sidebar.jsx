import React from 'react';
import { makeStyles } from "@mui/styles";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import CloseIcon from '@mui/icons-material/Close';

import { sidebarArray } from 'assets/const';

import styles from 'assets/jss/components/sidebarStyles';

const useStyles = makeStyles(styles)

const Sidebar = (props) => {

  const { open, handleClose, setCurMenu } = props

  const classes = useStyles()

  const clickMenu = (idx) => {
    setCurMenu(idx);
    handleClose();
  }

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={handleClose}
      className={classes.drawer}
    >
      <Box className={classes.contents}>
        <IconButton
          sx={{ display: 'flex', marginLeft: 'auto', marginRight: '8px', color: '#fff' }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <List>
          {sidebarArray.map((cell, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img src={cell.icon} alt="" width={36} />
                </ListItemIcon>
                <ListItemText>
                  {
                    cell.to !== '' ? (
                      <Link href={cell.to} underline='none' color='#fff' target='_blank'>
                        {cell.caption}
                      </Link>
                    ) : (
                      <Link onClick={() => clickMenu(index)} underline='none' color='#fff' variant='button'>
                        {cell.caption}
                      </Link>
                    )
                  }
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
