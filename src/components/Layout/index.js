import React, { Component } from 'react'
import { withStyles, MuiThemeProvider } from 'material-ui/styles'
import classNames from 'classnames'
import theme from './fusTheme'
import TopBar from './appbar'
import Drawer from './drawer'
import styles from './styles'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import debounce from 'lodash.debounce'
import { withApollo } from 'react-apollo'
import { PostSearchQuery } from '../../graphql/queries/posts'
import { withRouter } from 'react-router-dom'

class Layout extends Component {
  constructor (props) {
    super(props)
    this.deBounced = debounce(this.handleSearchSubmit, 450)
  }
  state = {
    open: false,
    anchorEl: null,
    openMenu: false,
    viewType: 'list',
    btnDrawerOpen: false,
    searchStyles: { display: 'none' },
    searchIconStyles: { display: 'block' },
    searchPosts: undefined,
    searchText: '',
    showSearch: false
  }
  componentWillMount () {
    const layoutType = window.localStorage.getItem('l-type') || 'list'
    this.setState({
      viewType: layoutType
    })
  }

  handleSearchSubmit = () => {
    if (this.state.searchText === '') this.setState({ searchText: ' ' })
    this.props.client
      .query({
        query: PostSearchQuery,
        variables: { search: this.state.searchText }
      })
      .then(res => this.setState({ searchPosts: res.data.posts }))
  }
  handleSearchToggle = () => {
    this.setState(state => ({ showSearch: !this.state.showSearch }))
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

  handleClosePV = () => {
    const view = window.localStorage.getItem('l-type')
    this.setState({
      viewType: view
    })
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
            handleAnyInputChange={this.handleAnyInputChange}
            searchStyles={this.state.searchStyles}
            searchIconStyles={this.state.searchIconStyles}
            handleSearchToggle={this.handleSearchToggle}
            showSearch={this.state.showSearch}
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
          <Drawer
            open={this.state.open}
            classes={this.props.classes}
            handleDrawerClose={this.handleDrawerClose}
            toggleDrawer={this.toggleDrawer}
            style={this.state.viewType === 'print' ? { display: 'none' } : {}}
          />
          <IconButton
            className='no-print'
            style={
              this.state.viewType === 'print'
                ? { top: '5px', left: '90%', position: 'absolute', zIndex: 1 }
                : { display: 'none' }
            }
            onClick={this.handleClosePV}
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
                      searchposts: this.state.searchPosts,
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
  handleAnyInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    this.deBounced()
  }
}

export default withApollo(withStyles(styles)(withRouter(Layout)))
