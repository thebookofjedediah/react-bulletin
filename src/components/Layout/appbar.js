import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import CloseIcon from 'material-ui-icons/Close'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import ViewQuiltIcon from 'material-ui-icons/ViewQuilt'
import ViewStreamIcon from 'material-ui-icons/ViewStream'
import SearchIcon from 'material-ui-icons/Search'
import PrintIcon from 'material-ui-icons/Print'
import TextField from 'material-ui/TextField'
import classNames from 'classnames'

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
  viewType,
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
            variant='display1'
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
            <IconButton
              onClick={handleSearchToggle}
              color='primary'
              aria-label='Search'
            >
              <SearchIcon />
            </IconButton>
          )}

          <IconButton
            onClick={handleLayoutChange}
            color='primary'
            aria-label='More'
          >
            {viewType === 'grid' ? <ViewStreamIcon /> : <ViewQuiltIcon />}
          </IconButton>
          <IconButton
            onClick={handlePrintIcon}
            color='primary'
            aria-label='More'
          >
            <PrintIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TopBar
