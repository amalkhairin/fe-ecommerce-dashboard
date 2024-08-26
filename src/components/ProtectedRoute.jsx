import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function ProtectedRoute({children}) {

    const {isAuthenticated} = useAuth()

    return isAuthenticated ? children : <Navigate to="/login" replace></Navigate>
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired
}

export default ProtectedRoute