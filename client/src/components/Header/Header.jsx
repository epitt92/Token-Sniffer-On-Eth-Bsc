import React from 'react';

import { makeStyles } from "@mui/styles";

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import MenuIcon from '@mui/icons-material/Menu';

import styles from 'assets/jss/components/headerStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles(styles)

const Header = (props) => {
  const theme = useTheme();
  const { handleOpenSidebar, searchTxt, handleChange } = props
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const searchPlaceholder = matchDownMD ? 'Name / Contract' : 'Enter a Contract, Name or Symbol';
  const classes = useStyles()

  return (
    <Box className={classes.header} position='relative'>
      <Box className={classes.logo}>
        <img src="/images/noruglogo.png" alt="Norug" width='100%' />
      </Box>
      <Box className={classes.searchField} position='relative'>
        <Box className={classes.socialLinks}>
          <Link href='https://t.me/+Jjyik-nt5ME5ODE0'>
            <img src="/images/telegram.svg" alt="" />
          </Link>
          <Link href='https://twitter.com/chengcalls'>
            <img src="/images/twitter.svg" alt="" />
          </Link>
          <Link href='https://www.youtube.com/channel/UCwFeRlcNOXlM06lillwfIVQ'>
            <img src="/images/youtube.svg" alt="" />
          </Link>
        </Box>
        <OutlinedInput
          value={searchTxt}
          onChange={handleChange}
          endAdornment={<InputAdornment position="end"><img src="/images/search.svg" alt="" /></InputAdornment>}
          fullWidth
          placeholder={searchPlaceholder}
        />
      </Box>
      <Box className={classes.banner} position='absolute' display='flex'>
        <img src="/images/banner1.png" alt="" width='100%' />
      </Box>
      <Box className={classes.bannerMobile}>
        <img src="/images/banner1.png" alt="" width='100%' />
      </Box>
      <IconButton className={classes.toggleBtn} onClick={handleOpenSidebar}>
        <MenuIcon />
      </IconButton>
    </Box>
  )
}

export default Header
