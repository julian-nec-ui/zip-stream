import './navbar.css';
function NavBar() {

  return (
    <>
      <title>Responsive NavBar</title>
      <header className="animated-gradient">
        <a href="#" className="logo">Zip Stream Chat</a>
        <input type="checkbox" className="menu-toggle" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav>
          <a href="#" onClick={() => { window.location.href = '/' }}>Home</a>
          <div className="dropdown">
            <a href="#">Our Services</a>
            <div className="dropdown-menu">
              <a href="#" onClick={() => { window.location.href = '/webdesign' }}>Web Design</a>
              <a href="#">UI/UX Development</a>
              <a href="#">Frontend Projects</a>
              <a href="#">React Apps</a>
            </div>
          </div>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>
    </>
  )
};

export default NavBar;