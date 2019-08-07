import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import { blue, yellow } from '@material-ui/core/colors'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import JotformEmbed from 'react-jotform-embed'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  textfield: {
    width: '100%',
    marginBottom: '24px'
  },
  bluetext: {
    color: blue[800]
  },
  marginTop: {
    marginTop: '20px'
  },
  hide: {
    display: 'none'
  },
  button: {
    background: yellow[800],
    color: '#fff'
  },
  padding: {
    padding: '30px'
  }
})

class AnnouncementForm extends Component {
  state = {
    files: '',
    btnText: 'SUBMIT'
  }

  render () {
    const classes = this.props.classes
    return (
      <Drawer
        anchor='bottom'
        open={this.props.btnDrawerOpen}
        onClose={this.props.toggleDrawer}
      >
        <div className={classes.padding}>
          <IconButton className={classes.closeButton}>
            <CloseIcon onClick={this.props.toggleDrawer} />
          </IconButton>

          <JotformEmbed src='https://form.jotform.com/91895433142157' />

          <Typography type='subtitle1' align='center'>
            Special bulletins may be sent between regular Student Life
            Bulletins. Learn more about special bulletins and how to request
            them <a href='/special'>here</a>.
          </Typography>
        </div>
      </Drawer>
    )
  }
  handleSubmit = e => {
    this.setState({
      btnText: 'SUBMITTING...'
    })
    e.preventDefault()
    const { title, announcement } = this.state
    if (!title || !announcement) {
      this.setState({
        btnText: 'Fill in all fields and try again'
      })
      return
    }
    // eslint-disable-next-line
    let formData = new FormData()
    formData.append('title', title)
    formData.append('announcement', announcement)
    for (const file of this.fileInp.files) formData.append('upload', file)
    // eslint-disable-next-line
    fetch('http://localhost:8080/email_announcement', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res.ok) {
          this.setState({
            btnText: 'SUBMITTED ✔️'
          })
        } else {
          this.setState({
            btnText: 'Oops! Try again'
          })
        }
      })
      .catch(er => {
        this.setState({
          btnText: 'Oops! Try again'
        })
      })
  }
  handleFileChange = e => {
    if (e.target.files) {
      let sString = ''
      // eslint-disable-next-line
      for (let file of e.target.files) {
        sString += ` ${file.name}`
      }
      this.setState({
        files: sString
      })
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
}

export default withStyles(styles)(AnnouncementForm)
