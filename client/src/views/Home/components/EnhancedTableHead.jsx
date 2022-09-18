import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const headCells_mobile = [
  {
    id: 'name',
    align: 'left',
    label: 'Name/Symbol'
  },
  {
    id: 'status',
    align: 'center',
    label: 'Status'
  },
  {
    id: 'age',
    align: 'center',
    label: 'Age'
  },
  {
    id: 'warning',
    align: 'center',
    label: 'Warning'
  },
  {
    id: 'deployer',
    align: 'center',
    label: 'Deployer'
  },
  {
    id: 'address',
    align: 'center',
    label: 'Address'
  },
  {
    id: 'verified',
    align: 'center',
    label: 'Verified'
  },
  // {
  //   id: 'lock',
  //   align: 'center',
  //   label: 'Lock'
  // },
  // {
  //   id: 'honeypot',
  //   align: 'center',
  //   label: 'Honeypot'
  // },
  {
    id: 'link',
    align: 'center',
    label: 'Link'
  },
  {
    id: 'socials',
    align: 'center',
    label: 'Socials'
  }
];

const headCells_desktop = [
  {
    id: 'name',
    align: 'left',
    label: 'Name/Symbol'
  },
  {
    id: 'status',
    align: 'center',
    label: 'Status'
  },
  {
    id: 'warning',
    align: 'center',
    label: 'Warning'
  },
  {
    id: 'deployer',
    align: 'center',
    label: 'Deployer'
  },
  {
    id: 'address',
    align: 'center',
    label: 'Address'
  },
  {
    id: 'verified',
    align: 'center',
    label: 'Verified'
  },
  // {
  //   id: 'lock',
  //   align: 'center',
  //   label: 'Lock'
  // },
  // {
  //   id: 'honeypot',
  //   align: 'center',
  //   label: 'Honeypot'
  // },
  {
    id: 'link',
    align: 'center',
    label: 'Link'
  },
  {
    id: 'socials',
    align: 'center',
    label: 'Socials'
  },
  {
    id: 'age',
    align: 'center',
    label: 'Age'
  }
]


const EnhancedTableHead = (props) => {
  const theme = useTheme();
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const headCells = matchDownMD ? headCells_mobile : headCells_desktop;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {
              headCell.id === 'age' ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : (
                <>
                  {headCell.label}
                </>
              )
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};
