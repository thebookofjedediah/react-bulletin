import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%'
  }
})

const Loader = props => {
  const classes = props.classes
  return (
    <Grid
      container
      className={classes.root}
      justify='center'
      alignItems='center'
    >
      <Grid item xs={4} sm={3} md={2}>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Loader)
