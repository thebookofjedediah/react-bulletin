import React, { Component } from 'react'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import classNames from 'clsx'
import theme from './fusTheme'
import TopBar from './appbar'
import Drawer from './drawer'
import styles from './styles'
import AnnouncementForm from './AnnouncementForm'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import debounce from 'lodash.debounce'
import { withApollo } from 'react-apollo'
import { PostSearchQuery, FilterDateQuery } from '../../graphql/queries/posts'
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
    viewtype: 'list',
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
      viewtype: layoutType
    })
  }

  handleSearchSubmit = () => {
    if (this.state.searchText === '') this.setState({ searchPosts: undefined })
    else {
      this.props.client
        .query({
          query: PostSearchQuery,
          variables: { search: this.state.searchText }
        })
        .then(res => this.setState({ searchPosts: res.data.posts }))
    }
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

  handleFilterDate = (month, year) => {
    month = !month ? null : month
    year = !year ? null : year
    this.props.client
      .query({
        query: FilterDateQuery,
        variables: { month, year }
      })
      .then(res => this.setState({ searchPosts: res.data.posts }))
  }

  handleLayoutChange = () => {
    const newVal = this.state.viewtype === 'grid' ? 'list' : 'grid'
    window.localStorage.setItem('l-type', newVal)
    this.setState({
      viewtype: newVal
    })
  }

  handlePrintIcon = () => {
    this.setState({
      viewtype: 'print'
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
      viewtype: view
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
            viewtype={this.state.viewtype}
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            classes={this.props.classes}
            openMenu={this.state.openMenu}
            handleDrawerOpen={this.handleDrawerOpen}
            handleClick={this.handleClick}
            handleRequestClose={this.handleRequestClose}
            handleLayoutChange={this.handleLayoutChange}
            handlePrintIcon={this.handlePrintIcon}
            style={this.state.viewtype === 'print' ? { display: 'none' } : {}}
          />
          <Drawer
            handleFilterDate={this.handleFilterDate}
            open={this.state.open}
            classes={this.props.classes}
            handleDrawerClose={this.handleDrawerClose}
            toggleDrawer={this.toggleDrawer}
            style={this.state.viewtype === 'print' ? { display: 'none' } : {}}
          />
          <AnnouncementForm
            btnDrawerOpen={this.state.btnDrawerOpen}
            toggleDrawer={this.toggleDrawer}
          />
          <IconButton
            className='no-print'
            style={
              this.state.viewtype === 'print'
                ? { top: '5px', left: '90%', position: 'absolute', zIndex: 1 }
                : { display: 'none' }
            }
            onClick={this.handleClosePV}
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.appFrame}>
            <main
              style={this.state.viewtype === 'print' ? { margin: '15px' } : {}}
              className={classNames(classes.content, this.state.open)}
            >
              {// eslint-disable-next-line
              this.props.children.map((child, i) => {
                  if (child) {
                    return React.cloneElement(child, {
                      viewtype: this.state.viewtype,
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
