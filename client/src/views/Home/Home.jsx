import React, { useState } from 'react';

import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import TableSection from './components/TableSection';
import MenuBox from './components/MenuBox';
import Captcha from './components/Captcha';
import Switch from '@mui/material/Switch';

import styles from 'assets/jss/views/homeStyles';

const useStyles = makeStyles(styles)

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 25,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 1,
    transitionDuration: '300ms',
    color: '#7635d5',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#605d5d',

      '& + .MuiSwitch-track': {
        backgroundColor: '#a0a4ba',
        opacity: 1,
        border: 0,
      },    
    },  
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 23,
    height: 23
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#a0a4ba',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Home = () => {

  const classes = useStyles()

  const [curMenu, setCurMenu] = useState(0)
  const [searchTxt, setSearchTxt] = useState('')
  const [openSidebar, setOpenSidebar] = useState(false)
  const [captchaPassStatus, setCaptchaPassStatus] = useState(false)
  const [liveToggleButtonChecked, setLiveToggleButtonChecked] = useState(true)  
  const [verifiedToggleButtonChecked, setVerifiedToggleButtonChecked] = useState(true)  

  return (
    <Box className={classes.wrapper}>
      <Header
        handleOpenSidebar={() => setOpenSidebar(true)}
        searchTxt={searchTxt}
        handleChange={(e) => setSearchTxt(e.target.value)}
      />
      <Box className={classes.contents}>
        <MenuBox curMenu={curMenu} setCurMenu={setCurMenu} />
        <Box className={classes.contentsInner}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Typography display='flex' alignItems='center'>
              <Typography variant='h3'>
                New Launches 
              </Typography>
              { curMenu === 0 ? 
                <img src="/images/eth.svg" alt="#" width={40} style={{ marginLeft: 10 }} />: 
                <img src="/images/tenor.svg" alt="#" width={40} style={{ marginLeft: 10 }} />
              }
            </Typography>
            <Box className={classes.proview} display='flex' alignItems='center'>
              <Typography variant='body1' fontSize={24} color='#8c3bff' fontWeight={700}>
                LIVE
              </Typography>
              <IOSSwitch 
                sx={{ m: 1 }} 
                onChange={() => setLiveToggleButtonChecked(!liveToggleButtonChecked)} 
              />
            </Box>
            <Box className={classes.proview} display='flex' alignItems='center'>
              <Typography variant='body1' fontSize={24} color='#8c3bff' fontWeight={700}>
                VERIFIED                
              </Typography>
              <IOSSwitch 
                sx={{ m: 1 }} 
                onChange={() => setVerifiedToggleButtonChecked(!verifiedToggleButtonChecked)} 
              />
            </Box>
          </Box>
          {
            captchaPassStatus ?             
              <TableSection 
                curMenu={curMenu} 
                searchTxt={searchTxt} 
                liveView={liveToggleButtonChecked} 
                verifiedView={verifiedToggleButtonChecked}
              />:
              <Captcha setCaptchaPassStatus={setCaptchaPassStatus}/>
          }
        </Box>
      </Box>
      <Sidebar
        open={openSidebar}
        handleClose={() => setOpenSidebar(false)}
        setCurMenu={setCurMenu}
      />
    </Box>
  )
}

export default Home