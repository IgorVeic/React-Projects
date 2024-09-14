import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { SiTailwindcss } from "react-icons/si";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";

const Footer = () => {
  return (
    <footer
      className="text-white p-4 flex items-center justify-between"
      style={{ background: "linear-gradient(135deg, #28b487, #7dd56f)" }}
    >
      <div className="flex items-center">&copy; 2024 Created by Igor Veic</div>
      <div className="flex space-x-4">
        <a
          href="https://github.com/IgorVeic"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-green-200 transition-transform duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
        <a
          href="https://www.linkedin.com/in/igor-veic-88a423233/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-green-200 transition-transform duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
        <a
          href="mailto:igorveic7@gmail.com"
          className="flex items-center hover:text-green-200 transition-transform duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </a>
      </div>
      <div className="flex items-center">
        Built with{" "}
        <FontAwesomeIcon
          icon={faHeart}
          className="text-red-500 mx-1"
          style={{ fontSize: "1rem" }}
        />
        using{" "}
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-green-200 transition-transform duration-300 hover:scale-110 mx-2"
        >
          <FontAwesomeIcon icon={faReact} size="lg" className="mr-1" /> React
        </a>{" "}
        and{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-green-200 transition-transform duration-300 hover:scale-110 mx-2"
        >
          <SiTailwindcss className="w-5 h-5 mr-1" /> Tailwind CSS
        </a>
      </div>
    </footer>
  );
};

export default Footer;
