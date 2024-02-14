import { Link } from "react-router-dom"
import "../styles/Footer.scss"
import { LocationOn, LocalPhone, Email } from "@mui/icons-material"
import logo from '../../public/shortprof2.jpg'
const Footer = () => {
  return (
    <div className="footer">

      <div className="footer_left">
        <div>
          <Link to="/"><img src={logo} alt="logo" /></Link>

          <h2>abdurrohim</h2>
        </div>

      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p > <Link to="tell:+88 019 32-989601">+8801932-989601</Link></p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p><a href="mailto:dev.abdurrohim@gmail.com">dev.abdurrohim@gmail.com</a></p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  )
}

export default Footer