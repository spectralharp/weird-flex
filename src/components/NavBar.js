import Logo from '../images/logo.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
  return (
    <nav className='nav'>
      <h1 className='flexing-title'><span className="flexee">Weird Flex</span> <span className="muscle">💪</span></h1>
      <ul className='nav__links'>
        <li className='nav__link'>
          <a href="https://github.com/spectralharp/weird-flex-react">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li className='nav__link'>
          <a href="https://bychao.com/">
            <img src={Logo} alt='Logo' />
          </a>
        </li>
      </ul>
    </nav>
  );
}