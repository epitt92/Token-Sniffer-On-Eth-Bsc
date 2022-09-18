const homeStyles = ((theme) => ({
  wrapper: {
    backgroundImage: 'url(/images/background.png)',
    minHeight: '100vh',
    backgroundSize: '100% 100%'
  },
  contents: {
    padding: '30px',
    [theme.breakpoints.down('md')]: {
      padding: '20px'
    }
  },
  contentsInner: {
    paddingLeft: '110px',
    '& h3': {
      fontWeight: '500',
      fontSize: '36px',
      lineHeight: '1',
      color: '#c1c6de'      
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0'
    },
    [theme.breakpoints.down('sm')]: {
      '& h3': {
        fontSize: '18px'
      }
    }
  },
  tableWrapper: {
    marginTop: '20px',
    borderRadius: '10px',
    '& .MuiPaper-root': {
      backgroundColor: '#27293d',
      borderRadius: '10px',
      border: '1px solid #c1c6de'
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-root': {
        color: 'hsla(0,0%,100%,.7)',
        fontSize: '12px',
        fontWeight: '600',
        padding: '25px 15px',
        '& .MuiButtonBase-root': {
          color: 'hsla(0,0%,100%,.7) !important',
          lineHeight: '1.2'
        },
        '& .MuiSvgIcon-root': {
          color: 'hsla(0,0%,100%,.7)'
        }
      }
    },
    '& .MuiTableBody-root .MuiTableCell-root': {
      fontSize: "15px",
      color: 'rgba(255, 255, 255, 0.8)',
      padding: '15px 15px',
      border: '0'
    },
    '& .MuiTableBody-root': {
      minHeight: '200px'
    },

    '& .MuiTableBody-root .MuiTableRow-root': {
      position: 'relative',
      '& th': {
        position: 'sticky',
        top: '0',
        left: '0',
        backgroundColor: '#27293d'
      }
    },
    '& .MuiTableHead-root .MuiTableRow-root': {
      position: 'relative',
      '& th:first-child': {
        position: 'sticky',
        top: '0',
        left: '0',
        backgroundColor: '#27293d',
        borderRadius: '10px 0 0 0',
        zIndex: '9'
      }
    }    
  },
  disabled: {
    opacity: '0.4'
  },
  links: {
    '& a': {
      marginRight: '5px'
    }
  },
  pagination: {
    color: '#fff !important',
    '& .MuiSvgIcon-root': {
      color: '#fff !important'
    }
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.8) !important'
  },
  menuBox: {
    background: "#27293d",
    border: "2px solid #8c3bff",   
    top: "10%",
    borderRadius: "30px",
    width: "80px",
    marginRight: "25px",
    marginTop: "10px",
    padding: "20px 0",
    zIndex: '1030',
    boxShadow: "0 2px 22px 0 rgb(0 0 0 / 20 %), 0 2px 30px 0 rgb(0 0 0 / 35 %)",
    overflow: 'hidden',
    transition: 'all 0.3s',
    '&:hover': {
      width: '200px',
      transition: 'all 0.3s'
    },
    [theme.breakpoints.down('md')]: {
      display: 'none !important'
    }
  },
  hamburger: {
    borderBottom: '1px solid #fff',   
    width: '100%',
    display: 'flex',
    boxSizing: 'border-box',
    justifyContent: 'start',
    padding: '0px 27px',
    '& img': {
      marginBottom: '20px'
    }
  },
  menuCaption: {
    color: '#fff',
    marginLeft: '35px'
  },
  iconContainer: {
    width: '100%',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '12px',
    boxSizing: 'border-box'
  },
  iconItem: {
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    '&:hover .iconCaption': {
      opacity: '1',
      transition: 'all 0.5s'
    }
  },
  active: {
    '&::after': {
      content: `''`,
      position: 'absolute',
      width: '5px',
      height: '60%',
      backgroundColor: "#8c3bff",
      display: 'block',
      right: '-20px'
    }
  },
  icon: {
    display: 'block',
    width: '40px',
    height: '40px',
    margin: '15px 0'
  },
  iconCaption: {
    color: '#fff',
    fontSize: '12px',
    fontWeight: '500',
    marginLeft: '30px',
    opacity: '0.7'
  },
  firstAge: {
    display: 'none !important',
    [theme.breakpoints.down('md')]: {
      display: 'table-cell !important'
    }
  },
  lastAge: {
    display: 'table-cell !important',
    [theme.breakpoints.down('md')]: {
      display: 'none !important'
    }
  },
  proview: {
    [theme.breakpoints.down('sm')]: {
      '& p': {
        fontSize: '12px',
        '& span': {
          fontSize: '12px'
        }
      } 
    }
  }
}))

export default homeStyles;
