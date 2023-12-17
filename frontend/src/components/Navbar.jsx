function Navbar() {
  return (
    <>
      <div className="time">
        <p>
          in the navbarr make times like UTC GMT and local time for me and local
          time for user
        </p>
      </div>

      <div id="navbar">
        <ul>
          <li>
            <a href="/">/</a>
          </li>

          <li>
            <a href="/portfolio">Portfolio</a>
          </li>

          <li>
            <a id="blog" href="/blog">
              Blog
            </a>
          </li>

          <li>
            <a href="/admin">Admin</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
