import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faTrashAlt, faClone, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { LanguageContext } from '../context/language-context';

export default function BoxSettingsPanel({ treeOp, activeNodeKey, activeBox }) {

  const language = useContext(LanguageContext);

  const { width, height, camouflage } = activeBox ? activeBox : {};

  function setField(update) {
    treeOp.updateNode(activeNodeKey, Object.assign({}, activeBox, { ...update }));
  }

  return (
    <>
      <h2 className="title"><FontAwesomeIcon icon={faSlidersH} /> {language.loc.boxSettings}</h2>
      <p>{language.loc.boxSettingsDesc}</p>

      <h3 className="title--group">{language.loc.boxSize}</h3>

      <div className="size-edit">
        <div className="size-edit__item">
          <label className="mark">width</label>
          <div className='input-unit'>
            <input type="number" aria-label="Flex container width input"
              disabled={width === undefined}
              value={width ? width : ''}
              onChange={e => setField({ width: parseInt(e.currentTarget.value) })}
              min="96"
              max="800"
              step="1"
              placeholder="auto"
            />
            {width !== undefined && <span>px</span>}
          </div>
            <input type="range" aria-label="Flex container width slider"
              disabled={width === undefined}
              value={width ? width : 0}
              onChange={e => setField({ width: parseInt(e.currentTarget.value) })}
              min="96"
              max="800"
              step="1"
            />
          <div className='toggle-group'>
            <input
              id='containerDescCheckbox'
              type="checkbox"
              checked={width !== undefined}
              onChange={e => setField({ width: e.currentTarget.checked ? 72 : undefined })}
            />
            <label htmlFor='containerDescCheckbox'>{language.loc.useSetWidth}</label>
          </div>
        </div>

        <div className="size-edit__item">
          <label className="mark">height</label>
          <div className='input-unit'>
            <input type="number"
              disabled={height === undefined}
              value={height ? height : ''}
              onChange={e => setField({ height: parseInt(e.currentTarget.value) })}
              min="96"
              max="800"
              step="1"
              placeholder="auto"
            />
            {height !== undefined && <span>px</span>}
          </div>
          <input type="range"
            disabled={height === undefined}
            value={height ? height : 0}
            onChange={e => setField({ height: parseInt(e.currentTarget.value) })}
            min="96"
            max="800"
            step="1"
          />
          <div className='toggle-group'>
            <input
              id='containerDescCheckbox'
              type="checkbox"
              checked={height !== undefined}
              onChange={e => setField({ height: e.currentTarget.checked ? 72 : undefined })}
            />
            <label htmlFor='containerDescCheckbox'>{language.loc.useSetHeight}</label>
          </div>
        </div>
      </div>

      <h3 className="title--group">{language.loc.action}</h3>
      <div className='btn-group'>
        <button
          className='btn'
          onClick={() => treeOp.addChildNode(activeNodeKey)}
        >
          <FontAwesomeIcon icon={faPlus} /> {language.loc.addItem}
        </button>
        <button
          disabled={activeNodeKey === '0'}
          className='btn'
          onClick={() => treeOp.duplicateNode(activeNodeKey)}
        >
          <FontAwesomeIcon icon={faClone} /> {language.loc.duplicate}
        </button>
        <button
          disabled={activeNodeKey === '0'}
          className='btn--danger'
          onClick={() => treeOp.removeNode(activeNodeKey)}>
          <FontAwesomeIcon icon={faTrashAlt} /> {language.loc.delete}
        </button>
      </div>

      <h3 className="title--group">{language.loc.mockup}</h3>
      <label className="title--group">{language.loc.type}</label>
      <select
        value={camouflage ? camouflage : ''}
        onChange={(e) => setField({ camouflage: e.currentTarget.value })}
      >
        <option value=''>{language.loc.type_none}</option>
        <option value='title'>{language.loc.type_title}</option>
        <option value='paragraph'>{language.loc.type_paragraph}</option>
        <option value='image'>{language.loc.type_image}</option>
      </select>
    </>
  );
}