
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import classNames from "classnames";

const Layout = ({ children, title, footer = true, dark = false }) => {
  return (
      <div className="bg-primary text-light text-center">
        <Navbar />
        <main className="container py-4">
          {/* Content */}
          {children}
        </main>

        {footer && (
            <footer className="bg-primary text-light text-center">
              <div className="container p-4">
                <h1>&copy; Tuten Labs</h1>
                <p>2000 - {new Date().getFullYear()}</p>
                <p>All rights Reserved.</p>
              </div>
            </footer>
        )}
      </div>
  );
};

Layout.proptypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  footer: PropTypes.bool,
};

export default Layout;