import PropTypes from 'prop-types'

const Header = (props) => {
    return (
        <header className="page__header">
            <h1>{ props.title }</h1>
        </header>
    )
}
Header.defaultProps = {
    title: 'Hello world Heading'
}
Header.propTypes = {
    title: PropTypes.string
}
export default Header
