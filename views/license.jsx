const React = require('react')
const DefaultLayout = require('./default')

function PreText (props) {
  return <pre>{props.value}</pre>
}

function ShowLicenses (props) {
  const repositoryUrl = props.repository
  return (
    <DefaultLayout title="GoogleTest のライセンス">
      <div>
        <h2>{props.name}</h2>
        <a href={repositoryUrl}>{repositoryUrl}</a>
        <PreText value={props.licenses}></PreText>
      </div>
    </DefaultLayout>
  )
}

module.exports = ShowLicenses