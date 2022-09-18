const headerStyles = ((theme) => ({
  header: {
    paddingTop: '50px',
    [theme.breakpoints.down("md")]: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '30px',
      flexWrap: 'wrap'
    },
    // [theme.breakpoints.down('sm')]: {
    //   flexWrap: 'wrap'
    // }
  },
  logo: {
    width: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '35px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '0',      
      width: '250px',
      marginLeft: '0',      
    },
    [theme.breakpoints.down('sm')]: {
      width: '200px'
    }
  },
  searchField: {
    width: '40%',
    minWidth: '450px',
    marginLeft: 'auto',
    marginRight: 'auto',    
    '& .MuiInputBase-root': {
      backgroundColor: "#27293d",
      borderRadius: '36px',      
    },
    '& .MuiInputBase-input': {
      fontSize: "16px",
      color: '#c1c6de',
      paddingLeft: '24px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #8c3bff !important'
    },
    [theme.breakpoints.down('md')]: {     
      minWidth: 'unset',    
      backgroundColor: '#332355',
      paddingTop: '10px',
      paddingBottom: '10px',
      width: '100%',
      order: '1',
      marginTop: '8px',
      marginRight: '0',
      display: 'flex',
      alignItems: 'center',
      '&::before': {
        position: 'absolute',
        content: `''`,
        width: 'calc(100% + 40px)',
        height: '100%',
        top: '0',
        left: '-20px',
        backgroundColor: '#332355'
      },
      '& .MuiInputBase-root': {
        width: '64%'
      }
    },
    [theme.breakpoints.down('sm')]: {      
      '& img': {
        width: '24px'
      },
      '& .MuiInputBase-input': {       
        paddingTop: '12px',
        paddingBottom: '12px'
      },
    }
  },
  toggleBtn: {
    '&.MuiButtonBase-root': {
      display: 'none',
      border: '2px solid #8c3bff',
      backgroundColor: '#27293d',
      borderRadius: '20px',
      '& .MuiSvgIcon-root': {
        color: '#8c3bff',
        fontSize: '2rem'
      },
      [theme.breakpoints.down("md")]: {
        display: 'flex'
      }     
    }    
  },
  banner: {
    width: '280px',
    bottom: '0',
    right: '30px',
    [theme.breakpoints.down('lg')]: {
      width: '190px'     
    },
    [theme.breakpoints.down('md')]: {
      display: 'none !important'
    }
  },
  bannerMobile: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      width: '100%',
      order: '2',
      marginTop: '20px'
    }
  },
  socialLinks: {
    display: 'none',
    '& img': {
      width: '36px'
    },
    '& a': {
      display: 'flex'
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      width: '36%',
      paddingRight: '20px',
      boxSizing: 'border-box',
      justifyContent: 'space-between',
      zIndex: '1'
    },
    [theme.breakpoints.down('sm')]: {
      '& img': {
        width: '24px'
      }
    }
  }
}))

export default headerStyles;
