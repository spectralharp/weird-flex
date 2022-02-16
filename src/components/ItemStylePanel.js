import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes } from '@fortawesome/free-solid-svg-icons';

export default function ItemStylePanel({ showDesc, setShowDesc, treeOp, activeNodeKey, activeBox }) {
  let style = null;
  if(activeBox) {
    style = activeBox.style;
  }

  function setStyle(e, rule) {
    const newBox = {...activeBox};
    if(!newBox.style) {
      newBox.style = {};
    }
    const newStyle = {...style}
    newStyle[rule] = e.currentTarget.value;
    newBox.style = newStyle;
    treeOp.updateNode(activeNodeKey, newBox);
  }

  function getValue(rule, defaultValue) {
    if(style && style[rule]) {
      return style[rule];
    }
    return defaultValue;
  }

  return (
    <>
      <h2 className="title"><FontAwesomeIcon icon={faBoxes} /> Flex Item Rules</h2>
      <div className='toggle-group--desc'>
        <input id='containerDescCheckbox' type="checkbox" checked={showDesc} onChange={() => setShowDesc(!showDesc)} />
        <label htmlFor='containerDescCheckbox'>Show Description</label>
      </div>
      {showDesc &&
        <>
          <p>
            Apply flex item CSS rules to the active box.
          </p>
          <p>
            Property values related to the
            <mark className="mark--red">main</mark>
            axis are marked in red and values related to the
            <mark className="mark--blue">cross</mark>
            axis are marked in blue.
          </p>
        </>
      }

      <h3 className="title--group">Alignment</h3>

      <div className='select-group'>
        <mark className="mark--blue">align-self</mark>
        <select
          value={getValue('alignSelf', '')}
          onChange={(e) => setStyle(e, 'alignSelf')}
        >
          <option value=''></option>
          <option value='flex-start'>flex-start</option>
          <option value='flex-end'>flex-end</option>
          <option value='center'>center</option>
          <option value='baseline'>baseline</option>
          <option value='stretch'>stretch</option>
        </select>
      </div>
      {showDesc &&
        <p className='description'>
          Align selected item by <mark className="mark--blue">cross</mark> axis
        </p>
      }

      <div className='select-group'>
        <mark className="mark">order</mark>
        <input
          value={getValue('order', '')}
          onChange={(e) => setStyle(e, 'order')}
          type="number"
          step="1"
          placeholder="0"
        />
      </div>
      {showDesc &&
        <p className='description'>
          Changes the order of selected item in the container
        </p>
      }

      <h3 className="title--group">Flexibility</h3>

      <div className='select-group'>
        <mark className="mark">flex-grow</mark>
        <input
          value={getValue('flexGrow', '')}
          onChange={(e) => setStyle(e, 'flexGrow')}
          type="number"
          step="1"
          placeholder="0"
        />
      </div>
      {showDesc &&
        <p className='description'>
          sets the flex grow factor
        </p>
      }

      <div className='select-group'>
        <mark className="mark">flex-shrink</mark>
        <input
          value={getValue('flexShrink', '')}
          onChange={(e) => setStyle(e, 'flexShrink')}
          type="number"
          step="1"
          placeholder="0"
        />
      </div>
      {showDesc &&
        <p className='description'>
          sets the flex shrink factor
        </p>
      }

      <div className='select-group'>
        <mark className="mark">flex-basis</mark>
        <input
          value={getValue('flexBasis', '')}
          onChange={(e) => setStyle(e, 'flexBasis')}
          placeholder="Length"
        />
      </div>
      {showDesc &&
        <p className='description'>
          sets the flex basis
        </p>
      }

      <div className='select-group'>
        <mark className="mark">flex</mark>
        <div className="flex-property">
          {`${getValue('flexGrow', '0')} ${getValue('flexShrink', '0')} ${getValue('flexBasis', 'auto')}`}
        </div>
      </div>
      {showDesc &&
        <p className='description'>
        A shorthand property that specifies
        <mark className="mark">flex-grow</mark>, <mark className="mark">flex-shrink</mark>,
        and <mark className="mark">flex-basis</mark>.
        </p>
      }
    </>
  );
}