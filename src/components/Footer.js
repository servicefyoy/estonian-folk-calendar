import PropTypes from 'prop-types'

const Footer = ({copyright, year}) => {
    return (
        <footer className="page__footer">
            <p>{copyright} / {year}</p>
        </footer>
    )
}
Footer.defaultProps = {
    copyright: 'Hello world Footer'
}
Footer.propTypes = {
    copyright: PropTypes.string.isRequired,
    year: PropTypes.number
}
export default Footer
