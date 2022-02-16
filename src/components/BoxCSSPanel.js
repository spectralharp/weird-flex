import './Panel.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode} from '@fortawesome/free-solid-svg-icons';

export default function BoxCSSPanel() {
  return (
    <>
      <h2 className="title"><FontAwesomeIcon icon={faFileCode} /> Markup</h2>
      <p>
        Shows the CSS markup for the active box
      </p>

      <div id="url-bar">
        <input type="text" id="url-output" />
        <button id="get-url-btn">Get URL</button>
      </div>
    </>
  );
}