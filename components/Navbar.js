import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container animate__animated animate__fadeInRight">
        <Link href="/">
          <a className="navbar-brand"><img src="/logo.png" alt="" className="img-fluid" style={{maxWidth: '25%'}} /></a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
