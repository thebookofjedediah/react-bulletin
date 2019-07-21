import React from 'react'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loader = () => {
  return (
    <Box display='flex' justifyContent='center'>
      <CircularProgress />
    </Box>
  )
}

export default Loader
