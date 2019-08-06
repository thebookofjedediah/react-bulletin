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
        Special bulletin requests should be sent to the Student Life Bulletin
        email (
        <a href='studentlifebulletin@student.franciscan.edu'>
          studentlifebulletin@student.franciscan.edu
        </a>
        ) or Mary Raskob (
        <a href='mraskob@franciscan.edu'>mraskob@franciscan.edu</a>). The
        request should consist of the exact language/wording of the bulletin
        along with any applicable contact information. Consideration of a
        special, student wide bulletin communication outside of the normal
        weekly Student Life Bulletin will be made by the Assistant Director of
        Student Life – Communication with consultation from the Vice President
        for Student Life. Special Bulletins should be reserved for extraordinary
        events that effect the entire student body. If the communication does
        not warrant a special bulletin, the announcement will be included in
        that week’s Student Life Bulletin.
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

export default Special
