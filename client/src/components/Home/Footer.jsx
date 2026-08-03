function Footer(){

  const currentYear = new Date().getFullYear();

  return(

    <footer>

      <p>© {currentYear} Addisu Hirbo. All rights reserved.</p>

    </footer>

  );

}

export default Footer;