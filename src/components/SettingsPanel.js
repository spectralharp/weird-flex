import presetData from '../data/presets.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default function SettingsPanel({ treeOp }) {
  return (
    <>
      <h2 className="title"><FontAwesomeIcon icon={faCog} /> Settings</h2>
      <div className='select-group'>
        <h3 className="title--group">Preset</h3>
        <select onChange={e => treeOp.updateNode('0', presetData[e.currentTarget.value].tree)}>
          { Object.keys(presetData).map(k =>
              <option key={k} value={k}>{presetData[k].name}</option>
            )
          }
        </select>
      </div>
    </>
  );
}