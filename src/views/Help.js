import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const Help = () => (
  <div>
    <Helmet>
      <title>Help | Student Bulletin FUS</title>
    </Helmet>
    <section className='help-page'>
      <h2>Getting Your Announcement Submitted</h2>
      <p>
        If you are looking to get a request for the bulletin submitted, please
        use the "Submit Announcement" form. Once submitted you will receive and
        email confirmation. If you are having issues getting the form to submit,
        or attachments to attach, please reach out to _________ from Student
        Life and they will be able to assist you.
      </p>

      <h2>Technical Difficulties</h2>
      <p>
        In a new app it is common for users to find and experience technical
        difficulties. We are committed to making this process as seamless as
        possible, so if you do run into any technical issues, or notice anything
        that should not be happening, please reach out to{' '}
        <a href='mailto:jarnold@franciscan.edu'>Jedediah Arnold</a>.
        <br />
        <br />
        <br />
      </p>
      <Link to={`/`}>
        <h3>Take me back to the Bulletin</h3>
      </Link>
    </section>
  </div>
)

export default Help
