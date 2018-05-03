import React from 'react'
import Header from '../common/Header.jsx'
import SearchList from './SearchList.jsx'
import ProgressCard from './ProgressCard.jsx'
import MsaMds from './MsaMds.jsx'
import Reports from './Reports.jsx'
import Report from './Report.jsx'
import { Link } from 'react-router-dom'

class Disclosure extends React.Component {
  constructor(props) {
    super(props)
    this.makeListItem = this.makeListItem.bind(this)
  }

  makeListItem(institution, index) {
    let url = this.props.match.url
    if (!url.match(/\/$/)) url += '/'
    return (
      <li key={index}>
        <h4>{institution.name}</h4>
        <p>Respondent ID: {institution.respondentId}</p>
        <Link
          to={`${url}institution/${institution.institutionId}`}
          className="usa-font-small"
        >
          View MSA/MDs
        </Link>
      </li>
    )
  }

  render() {
    const { params } = this.props.match
    const header = (
      <Header
        type={2}
        headingText="Disclosure reports"
        paragraphText="These reports summarize lending activity for individual
              institutions, both nationwide and by MSA/MD."
      />
    )

    return (
      <>
        {header}
        {params.institutionId ? (
          <ProgressCard name id link />
        ) : (
          <SearchList makeListItem={this.makeListItem} />
        )}
        {params.msaMdId ? <ProgressCard name id link /> : <MsaMds />}
        {params.reportId ? <ProgressCard name id link /> : <Reports />}
        {params.reportId ? <Report /> : null}
      </>
    )
  }
}

export default Disclosure
