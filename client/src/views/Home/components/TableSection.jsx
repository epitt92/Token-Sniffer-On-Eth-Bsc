import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from "@mui/styles";

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import io from "socket.io-client";

import EnhancedTableHead from './EnhancedTableHead';
import Spinner from 'components/Spinner';

import styles from 'assets/jss/views/homeStyles';

const useStyles = makeStyles(styles)

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const TableSection = (props) => {
  
  const endpoint = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  // const endpoint = 'https://dev.norug.com:5001';
  // const endpoint = 'http://localhost:5000';
  // const endpoint = 'https://api.norug.com';
  
  const { curMenu, searchTxt, liveView, verifiedView } = props
  const classes = useStyles()

  const [socket, setSocket] = useState(null)
  const [baseUrl, setBaseUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([])
  const [allData, setAllData] = useState([])
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('age');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [copyToken, setCopyToken] = useState(false);

  const handleRequestSort = (event, property) => {    
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showAge = (deployDate) => {
    let t1 = new Date().getTime();
    let t2 = deployDate * 1000;
    let seconds = (t1 - t2) / 1000;
    if (seconds < 60) {
      return parseInt(seconds) + "S";
    }
    if (seconds < 3600) {
      return parseInt(seconds / 60) + "M"
    }
    if (seconds < 3600 * 24) {
      return parseInt(seconds / 3600) + "H"
    }
    if (seconds < 3600 * 24 * 30) {
      return parseInt(seconds / 3600 / 24) + "D"
    }
    if (seconds < 3600 * 24 * 30 * 12) {
      return parseInt(seconds / 3600 / 24 / 30) + "M"
    }
  }

  const handleCopy = (addr) => {
    navigator.clipboard.writeText(addr);
    setCopyToken(true);
  }

  const getOnlyTableData = (tokens) => {
    let network = curMenu===0?"ethereum":"bsc";
    let data = tokens.filter(token => token['network'] === network)
    setTableData([...data]);
  }

  const searchQuery = (token) => {
    let lowerSearchTxt = searchTxt.toLowerCase();
    if (liveView && verifiedView) { 
      return token.status === 'LIVE' && token.isVerified && 
        (token.name.toLowerCase().includes(lowerSearchTxt) ||
        token.symbol.toLowerCase().includes(lowerSearchTxt) ||
        token.address.toLowerCase().includes(lowerSearchTxt) ||
        token.deployer.toLowerCase().includes(lowerSearchTxt));
    } 
    if (liveView && !verifiedView) {
      return token.status === 'LIVE' &&
        (token.name.toLowerCase().includes(lowerSearchTxt) ||
        token.symbol.toLowerCase().includes(lowerSearchTxt) ||
        token.address.toLowerCase().includes(lowerSearchTxt) ||
        token.deployer.toLowerCase().includes(lowerSearchTxt))
    }
    if (!liveView && verifiedView) {
      return token.isVerified &&
        (token.name.toLowerCase().includes(lowerSearchTxt) ||
        token.symbol.toLowerCase().includes(lowerSearchTxt) ||
        token.address.toLowerCase().includes(lowerSearchTxt) ||
        token.deployer.toLowerCase().includes(lowerSearchTxt));
    } else {
      return token.name.toLowerCase().includes(lowerSearchTxt) ||
        token.symbol.toLowerCase().includes(lowerSearchTxt) ||
        token.address.toLowerCase().includes(lowerSearchTxt) ||
        token.deployer.toLowerCase().includes(lowerSearchTxt);      
    }
  }
/*
  const fetchTableData = () => {
    // let params = {
    //   network : curMenu===0?"ethereum":"bsc"
    // }
    setLoading(true);

    axios.get(`${endpoint}/tokens`).then((res) => {
    // axios.get('/tokens').then((res) => {
      setAllData([...res.data])
    }).finally(() => {
      setLoading(false)
    })
  }
  */
  // "https://api.norug.com/tokens"
  // "https://dev.norug.com:5001/tokens"

  //init
  useEffect(() => {
    // console.log("started")
    const soc = io(endpoint);
    setSocket(soc);
    // fetchTableData();
  }, []);

  //function with socket
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.on("ethscan:pairStatus", (data) => {
          setAllData(data.data)
          // setPairData(data.data);
          // dataStore(data.data);
        });
      });
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    getOnlyTableData(allData);
    let base = curMenu===0? "https://etherscan.io" : "https://bscscan.com";
    setBaseUrl(base);
    // eslint-disable-next-line
  }, [allData, curMenu])

  useEffect(() => {
    if (copyToken) {
      setTimeout(() => {
        setCopyToken(false);
      }, 1000);
    }
  });
  
  return (
    <Box sx={{ width: '100%' }} className={classes.tableWrapper} position='relative'>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {stableSort(tableData.filter(searchQuery), getComparator(order, 'timestamp'))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}    
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        sx={{ color: 'rgba(255, 255, 255, 1) !important' }}
                      >
                        {`${row.name.slice(0, 20)}${row.name.length > 20 ? '...': '' }`} 
                        <Typography variant='body1' component='span' fontSize={11} color='#549047' sx={{ marginLeft: '5px', marginTop: '5px' }}>
                          {`${row.symbol.slice(0, 20)}${row.name.length > 20 ? '...': '' }`} 
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'rgba(255, 255, 255, 0.8) !important' }}>
                        {row.status}
                      </TableCell>
                      <TableCell align="center"  className={classes.firstAge}>
                        {row.timestamp ? showAge(row.timestamp) : "-"}
                      </TableCell>
                      <TableCell align="center">
                        -
                        {/* <img src="/images/warning1.png" alt="#" width={18} /> */}
                      </TableCell>
                      <TableCell align="center">
                        <Link href={`${baseUrl}/address/${row.deployer}`} target='_blank'>
                          <img src="/images/deployer.svg" alt="#" width={18} />
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant='body1' component='span' fontSize={15} color='rgba(255, 255, 255, 0.8)' sx={{ marginRight: '5px' }}>
                          {row.address.slice(0, 5)}...{row.address.substr(-4, 4)}                          
                        </Typography>
                        <Tooltip
                          title={copyToken ? "Copied" : "Copy To Address to clipboard"}
                          placement="top"
                          classes={{
                            tooltip: classes.tooltip
                          }}
                        >
                          <img
                            data-tip
                            data-for={"copyId" + row._id}
                            id={`token_hover_copy_id-${row._id}`}
                            src="/images/copyIcon.svg"
                            alt=""
                            width={16}
                            onClick={() => handleCopy(row.address)}
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        {
                          row.isVerified === true ? 
                            <img src="/images/checked.png" alt="#" width={18} /> : 
                            <img src="/images/unchecked.png" alt="#" width={18} />
                          }

                      </TableCell>
                      {/* <TableCell align="center">
                        {
                          row.isLocked === true ? 
                            <img src="/images/checked.png" alt="#" width={18} /> : 
                            <img src="/images/unchecked.png" alt="#" width={18} />
                          
                        }
                      </TableCell> */}
                      {/* <TableCell align="center">
                        {
                        row.isHoneypot === true ? 
                          <img src="/images/checked.png" alt="#" width={18} /> : 
                          <img src="/images/unchecked.png" alt="#" width={18} />
                        
                        }
                      </TableCell> */}

                      <TableCell align="center">
                        <Box display='flex' alignitems='center' justifyContent='center'>
                          <Link
                            href={`${baseUrl}/address/${row.address}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src="/images/opensea.svg" alt="#" width={18} />
                          </Link>&nbsp;
                          <Link
                            href={`https://www.dextools.io/app/${curMenu===0?'ether':'bnb'}/pair-explorer/${row.address}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src="/images/dextools.svg" alt="#" width={18} />
                          </Link>&nbsp;
                          {
                            row.status === 'LIVE' ? (
                              <Link
                                href={curMenu===0?`https://app.uniswap.org/#/swap?outputCurrency=${row.address}&chain=mainnet`:`https://pancakeswap.finance/swap?outputCurrency=${row.address}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img src={curMenu===0?"/images/uniswap.svg":"/images/pancakeswap.png"} alt="#" width={18} />
                              </Link>
                            ) : (
                              <Link
                                disabled
                                rel="noreferrer"
                              >
                                <img src={curMenu===0?"/images/uniswap.svg":"/images/pancakeswap.png"} alt="#" style={{"opacity": 0.3}} width={18} />
                              </Link>
                            )
                          }
                        </Box>
                      </TableCell>

                      <TableCell align="center">
                        <Box display='flex' alignitems='center' justifyContent='center' className={classes.links}>
                          {
                            row.website ? (
                              <Link href={row.website} target="_blank" rel="noreferrer" >
                                <img src="images/website.png" alt="#" width={18} />
                              </Link>
                            ) : (
                              <Link href='/' rel="noreferrer" sx={{ pointerEvents: 'none' }} >
                                <img src="images/website.png" alt="#" width={18} className={classes.disabled} />
                              </Link>
                            )
                          }
                          {
                            row.medium ? (
                              <Link href={row.medium} target="_blank" rel="noreferrer" >
                                <img src="images/medium.svg" alt="#" width={18} />
                              </Link>
                            ) : (
                              <Link sx={{ pointerEvents: 'none' }} rel="noreferrer" >
                                <img src="images/medium.svg" alt="#" width={18} className={classes.disabled} />
                              </Link>
                            )
                          }
                          {
                            row.telegram ? (
                              <Link href={row.telegram} target="_blank" rel="noreferrer">
                                <img src="images/menu_telegram.svg" alt="#" width={18} />
                              </Link>
                            ) : (
                              <Link sx={{ pointerEvents: 'none' }} rel="noreferrer" href='/'>
                                <img src="images/menu_telegram.svg" alt="#" width={18} className={classes.disabled} />
                              </Link>
                            )
                          }
                          {
                            row.twitter ? (
                              <Link href={row.twitter} target="_blank" rel="noreferrer">
                                <img src="images/menu_twitter.svg" alt="#" width={18} />
                              </Link>
                            ) : (
                              <Link sx={{ pointerEvents: 'none' }} rel="noreferrer">
                                <img
                                  src="images/menu_twitter.svg" alt="#" width={18} className={classes.disabled} />
                              </Link>
                            )
                          }
                          {/* {
                            row.youtube ? (
                              <Link href={row.youtube} target="_blank" rel="noreferrer">
                                <img src="images/menu_youtube.svg" alt="#" width={18} />
                              </Link>
                            ) : (
                              <Link sx={{ pointerEvents: 'none' }} rel="noreferrer">
                                <img src="images/menu_youtube.svg" alt="#" width={18} className={classes.disabled} />
                              </Link>
                            )
                          } */}
                        </Box>
                      </TableCell>

                      <TableCell align="center" className={classes.lastAge}>
                        {row.timestamp ? showAge(row.timestamp) : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {
                tableData.length === 0 && (
                  <TableRow sx={{height: '200px'}} />
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={tableData.filter(searchQuery).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className={classes.pagination}
        />
      </Paper>
      {
        loading && (
          <Box position='absolute' left='50%' sx={{ transform: 'translateX(-50%)', top: '130px' }}>
            <Spinner />
          </Box>
        )
      }
    </Box>
  )
}

export default TableSection
