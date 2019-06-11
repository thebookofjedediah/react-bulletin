import React, { Component } from 'react'
import { withStyles, MuiThemeProvider } from 'material-ui/styles'
import classNames from 'classnames'
import theme from './fusTheme'
import TopBar from './appbar'
import SideBar from './drawer'
import styles from './styles'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

class Layout extends Component {
  state = {
    open: false,
    anchorEl: null,
    openMenu: false,
    viewType: 'list',
    btnDrawerOpen: false
  }
  componentWillMount () {
    const layoutType = window.localStorage.getItem('l-type') || 'list'
    this.setState({
      viewType: layoutType
    })
  }
  handleDrawerOpen = () => {
    this.setState({ open: true })
  }
  handleClick = event => {
    this.setState({
      openMenu: true,
      anchorEl: event ? event.currentTarget : null
    })
  }

  handleLayoutChange = () => {
    const newVal = this.state.viewType === 'grid' ? 'list' : 'grid'
    window.localStorage.setItem('l-type', newVal)
    this.setState({
      viewType: newVal
    })
  }

  handlePrintIcon = () => {
    this.setState({
      viewType: 'print'
    })
  }

  handleRequestClose = () => {
    this.setState({ openMenu: false })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  toggleDrawer = () => {
    this.setState({ btnDrawerOpen: !this.state.btnDrawerOpen })
  }

  render () {
    const classes = this.props.classes
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <TopBar
            viewType={this.state.viewType}
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            classes={this.props.classes}
            openMenu={this.state.openMenu}
            handleDrawerOpen={this.handleDrawerOpen}
            handleClick={this.handleClick}
            handleRequestClose={this.handleRequestClose}
            handleLayoutChange={this.handleLayoutChange}
            handlePrintIcon={this.handlePrintIcon}
            style={this.state.viewType === 'print' ? { display: 'none' } : {}}
          />
          <SideBar
            open={this.state.open}
            classes={this.props.classes}
            handleDrawerClose={this.handleDrawerClose}
            style={this.state.viewType === 'print' ? { display: 'none' } : {}}
          />
          <IconButton
            className='no-print'
            style={
              this.state.viewType === 'print'
                ? { top: '5px', left: '30px', position: 'relative', zIndex: 1 }
                : { display: 'none' }
            }
            onClick={this.handleLayoutChange}
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.appFrame}>
            <main
              style={this.state.viewType === 'print' ? { margin: '15px' } : {}}
              className={classNames(classes.content, this.state.open)}
            >
              {// eslint-disable-next-line
              this.props.children.map((child, i) => {
                  if (child) {
                    return React.cloneElement(child, {
                      viewtype: this.state.viewType,
                      key: i
                    })
                  }
                })}
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Layout)
