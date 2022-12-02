import React, {FC} from "react";
import './footer.css';

const Footer: FC = () => {
    return (
        <footer>
            <div className="copyright">
                <p>Test website &copy 2022</p>
            </div>
            <div className="social">
                <a href="#" className="support">Contact Us</a>
                <a href="#" className="face">f</a>
                <a href="#" className="tweet">t</a>
                <a href="#" className="linked">in</a>
            </div>
        </footer>
    )
}

export default Footer;