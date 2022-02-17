import presetData from '../data/presets.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { LanguageContext } from '../context/language-context';

export default function SettingsPanel({ treeOp }) {

  const language = useContext(LanguageContext);

  return (
    <>
      <h2 className="title"><FontAwesomeIcon icon={faCog} /> {language.loc.settings}</h2>
      <div className='select-group'>
        <h3 className="title--group">{language.loc.preset}</h3>
        <select onChange={e => treeOp.updateNode('0', presetData[e.currentTarget.value].tree)}>
          { Object.keys(presetData).map(k =>
              <option key={k} value={k}>{language.preset[k]}</option>
            )
          }
        </select>
      </div>
    </>
  );
}