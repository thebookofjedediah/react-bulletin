import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt'
import ViewStreamIcon from '@material-ui/icons/ViewStream'
import SearchIcon from '@material-ui/icons/Search'
import PrintIcon from '@material-ui/icons/Print'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Hidden from '@material-ui/core/Hidden'
import classNames from 'clsx'

const TopBar = ({
  classes,
  open,
  searchStyles,
  searchIconStyles,
  handleAnyInputChange,
  handleSearchToggle,
  openSearch,
  handleDrawerOpen,
  handleClick,
  anchorEl,
  handleRequestClose,
  handleLayoutChange,
  handlePrintIcon,
  viewtype,
  showSearch,
  style
}) => {
  return (
    <div style={style}>
      <AppBar className={classNames(classes.appBar, open)}>
        <Toolbar disableGutters={!open}>
          <IconButton
            color='primary'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, classes.navIconHide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h5'
            color='inherit'
            className={classNames(classes.flex, classes.typo)}
            noWrap
          >
            Student Bulletin
          </Typography>

          {showSearch ? (
            <div>
              <TextField
                onChange={handleAnyInputChange}
                name='searchText'
                placeholder='Search'
                autoFocus
              />

              <IconButton
                onClick={handleSearchToggle}
                color='primary'
                aria-label='Close Search'
              >
                <CloseIcon />
              </IconButton>
            </div>
          ) : (
            <Tooltip title='Search' placement='bottom'>
              <IconButton
                onClick={handleSearchToggle}
                color='primary'
                aria-label='Search'
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          )}

          <Hidden implementation='css' xsDown>
            <Tooltip
              title={viewtype === 'grid' ? 'List View' : 'Grid View'}
              placement='bottom'
            >
              <IconButton
                onClick={handleLayoutChange}
                color='primary'
                aria-label='View Type'
              >
                {viewtype === 'grid' ? <ViewStreamIcon /> : <ViewQuiltIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title='Print View' placement='bottom'>
              <IconButton
                onClick={handlePrintIcon}
                color='primary'
                aria-label='More'
              >
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TopBar
