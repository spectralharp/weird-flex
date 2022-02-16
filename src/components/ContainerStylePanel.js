import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';

export default function ContainerStylePanel({ showDesc, setShowDesc, treeOp, activeNodeKey, activeBox }) {
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
      <h2 className="title"><FontAwesomeIcon icon={faArchive} /> Flex Container Rules</h2>
      <div className='toggle-group--desc'>
        <input id='containerDescCheckbox' type="checkbox" checked={showDesc} onChange={() => setShowDesc(!showDesc)}/>
        <label htmlFor='containerDescCheckbox'>Show Description</label>
      </div>
      {showDesc &&
        <>
          <p>
            Apply flex container CSS rules to the active box.
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

      <h3 className="title--group">Display</h3>

      <div className='select-group'>
        <mark className="mark">display</mark>
        <select
          value={getValue('display', 'block')}
          onChange={(e) => setStyle(e, 'display')}
        >
          <option value='block'>block</option>
          <option value='flex'>flex</option>
          <option value='inline-flex'>inline-flex</option>
        </select>
      </div>
      {showDesc &&
        <p className='description'>
          Setting <mark className="mark">display</mark> to <strong>flex</strong> or <strong>inline-flex</strong> will
          make this box a <strong>flex container</strong>, changing how it's children
          are layed out. A <strong>flex</strong> container is a block element and
          an <strong>inline-flex</strong> container is an inline element
        </p>
      }

      <h3 className="title--group">Orientation</h3>

      <div className='select-group'>
        <mark className="mark--red">flex-direction</mark>
        <select
          value={getValue('flexDirection', '')}
          onChange={(e) => setStyle(e, 'flexDirection')}
        >
          <option value=''></option>
          <option value='row'>row</option>
          <option value='row-reverse'>row-reverse</option>
          <option value='column'>column</option>
          <option value='column-reverse'>column-reverse</option>
        </select>
      </div>
      {showDesc &&
        <p className='description'>
          Determines the <mark className="mark--red">main</mark> axis of the container
        </p>
      }

      <div className='select-group'>
        <mark className="mark">flex-wrap</mark>
        <select
          value={getValue('flexWrap', '')}
          onChange={(e) => setStyle(e, 'flexWrap')}
        >
          <option value=''></option>
          <option value='wrap'>wrap</option>
          <option value='nowrap'>nowrap</option>
          <option value='wrap-reverse' className='mark--blue'>wrap-reverse</option>
        </select>
      </div>
      {showDesc &&
        <p className='description'>
          Determines whether the items wrap to a seperate line
          (<mark className="mark--blue">wrap-reverse</mark> will also change the
          direction of the <mark className="mark--blue">cross</mark> axis)
        </p>
      }

      <div className='select-group'>
        <mark className="mark">flex-flow</mark>
        <div className="flex-property">
          {`${getValue('flexDirection', 'row')} ${getValue('flexWrap', 'nowrap')}`}
        </div>
      </div>
      {showDesc &&
        <p className='description'>
          A shorthand property that specifies
          both <mark className="mark">flex-direction</mark> and <mark className="mark">flex-flow</mark>.
        </p>
      }

      <h3 className="title--group">Alignment</h3>

      <div className='select-group'>
        <mark className="mark--red">justify-content</mark>
        <select
          value={getValue('justifyContent', '')}
          onChange={(e) => setStyle(e, 'justifyContent')}
        >
          <option value=''></option>
          <option value='flex-start'>flex-start</option>
          <option value='flex-end'>flex-end</option>
          <option value='center'>center</option>
          <option value='space-around'>space-around</option>
          <option value='space-between'>space-between</option>
          <option value='space-evenly'>space-evenly</option>
        </select>
      </div>
      {showDesc &&
        <p className='description'>
            Align items by the <mark className="mark--red">main</mark> axis
        </p>
      }

      <div className='select-group'>
        <mark className="mark--blue">align-items</mark>
        <select
          value={getValue('alignItems', '')}
          onChange={(e) => setStyle(e, 'alignItems')}
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
          Align all items by the <mark className="mark--blue">cross</mark> axis
        </p>
      }

      <div className='select-group'>
        <mark className="mark--blue">align-content</mark>
        <select
          value={getValue('alignContent', '')}
          onChange={(e) => setStyle(e, 'alignContent')}
        >
          <option value=''></option>
          <option value='flex-start'>flex-start</option>
          <option value='flex-end'>flex-end</option>
          <option value='center'>center</option>
          <option value='space-around'>space-around</option>
          <option value='space-between'>space-between</option>
          <option value='space-evenly'>space-evenly</option>
          <option value='stretch'>stretch</option>
        </select>
      </div>
      {showDesc &&
        <p className='description'>
          Align <strong>lines</strong> of items by the <mark className="mark--blue">cross</mark> axis
        </p>
      }
    </>
  );
}