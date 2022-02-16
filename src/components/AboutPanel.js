import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faArchive, faBoxes, faCog, faFileCode} from '@fortawesome/free-solid-svg-icons';

export default function AboutPanel() {
  return (
    <>
      <h2 className="title"><FontAwesomeIcon icon={faQuestionCircle} /> About</h2>
      <h3 className="title--group">What's this?</h3>
      <p>
        This is an interactive website that allows you to test out different
        CSS flexbox property.
      </p>
        The <mark className="mark--red">main</mark> and <mark className="mark--blue">cross</mark> axis
        are marked on the side of the box, and updates based on the
        flexbox properties applied.
      <h3 className="title--group">Selection</h3>
      <p>
        Clicking on a box selects it as the active box, clicking again will cancel the selection.
      </p>
      <h3 className="title--group">Resize</h3>
      <p>
        The boxes is resizable, you can adjust their sizes by dragging on the lower right of the
        container.
      </p>
      <h3 className="title--group">Pinning</h3>
      <p>
        You can click on the pin button on the top left of the outer most box to pin it,
        fixing it's position while scrolling
      </p>
    </>
  );
}