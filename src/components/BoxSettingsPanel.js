import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faTrashAlt, faClone, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function BoxSettingsPanel({ treeOp, activeNodeKey, activeBox }) {

  const { width, height, camouflage } = activeBox ? activeBox : {};

  function setField(update) {
    treeOp.updateNode(activeNodeKey, Object.assign({}, activeBox, { ...update }));
  }

  return (
    <>
      <h2 className="title"><FontAwesomeIcon icon={faSlidersH} /> Box Settings</h2>
      <p>
        Apply settings on the active box
      </p>

      <h3 className="title--group">Actions</h3>
      <div>
        <button
          className='btn'
          onClick={() => treeOp.addChildNode(activeNodeKey)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Item
        </button>
        <button
          className='btn'
          onClick={() => treeOp.duplicateNode(activeNodeKey)}
        >
          <FontAwesomeIcon icon={faClone} /> Duplicate
        </button>
        <button
          className='btn--danger'
          onClick={() => treeOp.removeNode(activeNodeKey)}>
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </button>
      </div>

      <h3 className="title--group">Box Size</h3>

      <div className="size-edit">
        <div className="size-edit__item">
          <label className="title--group">Width</label>
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
            <label htmlFor='containerDescCheckbox'>Use set width</label>
          </div>
        </div>

        <div className="size-edit__item">
          <label className="title--group">Height</label>
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
            <label htmlFor='containerDescCheckbox'>Use set height</label>
          </div>
        </div>
      </div>

      <h3 className="title--group">Mockup</h3>
      <label>Type</label>
      <select
        value={camouflage ? camouflage : ''}
        onChange={(e) => setField({ camouflage: e.currentTarget.value })}
      >
        <option value=''>None</option>
        <option value='title'>Title</option>
        <option value='paragraph'>Paragraph</option>
        <option value='image'>Image</option>
      </select>
    </>
  );
}