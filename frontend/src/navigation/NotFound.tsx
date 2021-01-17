import { Link } from 'react-router-dom';

import './styles.scss';

const NotFound = () => (
  <div className="not-found">
    <h1>404 - Not Found!</h1>
    <Link className="link" to="/">
      Go Home
    </Link>
  </div>
);

export default NotFound;