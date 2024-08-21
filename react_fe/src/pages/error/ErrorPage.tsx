import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/error.scss';
import errorSvg from '../../assets/images/error/error.svg';

const ErrorPage = (): ReactElement => {
  return (
    <div className="error-page d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="text-secondary">Oops! Page Not Found!</h1>
      <p className="text-primary text-center">
        We couldn’t locate the page you’re trying to reach. We apologize for any inconvenience this
        may have caused. Thank you for your understanding!
      </p>
      <img
        alt="Not Found Image"
        src={errorSvg}
        className="error-image"
      />
      <Link to="/" className="btn btn-primary btn-lg">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
