import React from 'react';
import { makeStyles } from "@mui/styles";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { sidebarArray } from 'assets/const';

import styles from 'assets/jss/views/homeStyles';

const useStyles = makeStyles(styles)

const MenuBox = (props) => {

  const { curMenu, setCurMenu } = props

  const classes = useStyles()


  const clickMenu = (idx) => {
    setCurMenu(idx);
  }

  return (
    <Box className={classes.menuBox} position='fixed' alignItems='center' display='flex' flexDirection='column'>
      <Box className={classes.hamburger}>
        <img src="images/hamburger.svg" alt="#" />
        <span className={classes.menuCaption}>Menu</span>
      </Box>
      <Box className={classes.iconContainer}>
        {sidebarArray.map((el, idx) =>
          el['to'] !== "" ? (
            <Link rel="noreferrer" underline='none' target='_blank' href={el.to} onClick={() => clickMenu(idx)} key={idx} className={`${classes.iconItem} ${idx === curMenu ? classes.active : ""}`}>
              <img src={el.icon} alt="#" className={classes.icon} />
              <Box className={classes.iconCaption + ' iconCaption'}>{el.caption}</Box>
            </Link>
          ) : (
            <Link rel="noreferrer" underline='none' variant='button' onClick={() => clickMenu(idx)} key={idx} className={`${classes.iconItem} ${idx === curMenu ? classes.active : ""}`}>
              <img src={el.icon} alt="#" className={classes.icon} />
              <Box className={classes.iconCaption + ' iconCaption'}>{el.caption}</Box>
            </Link>
          ))}
      </Box>
    </Box>
  )
}

export default MenuBox
