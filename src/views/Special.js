import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const Special = () => (
  <div>
    <Helmet>
      <title>Special Bulletin | Student Bulletin FUS</title>
    </Helmet>
    <section className='help-page'>
      <h2>Special Bulletins – Student Life Bulletin</h2>
      <p>
        A Special Bulletin, sent as an email to the entire student body outside
        of the normal weekly Student Life Bulletin, will be made by the
        Assistant Director of Student Life – Communication with consultation
        from the Vice President for Student Life. Special Bulletins are reserved
        for extraordinary events that effect the entire student body. If the
        communication does not warrant a special bulletin, the announcement will
        be considered for inclusion in the next Student Life Bulletin.
        <br />
        <br />
        If you would like to request a Special Bulletin, include the following
        in an email to Mary Raskob, at{' '}
        <a href='mailto:mraskob@franciscan.edu'>mraskob@franciscan.edu</a>.
        <ul>
          <li>Exact wording of the bulletin</li>
          <li>
            Name and relevant contact information of the person or campus group
            requesting the bulletin
          </li>
          <li>Any relevant attachments</li>
        </ul>
      </p>
      <br />

      <Link to={`/`} className='fix-link'>
        <h3>Take me back to the Bulletin</h3>
      </Link>
    </section>
  </div>
)

export default Special
