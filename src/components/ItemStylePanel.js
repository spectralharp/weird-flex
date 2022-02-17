import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { LanguageContext } from '../context/language-context';
import FlexMarkdown from './FlexMarkdown';

export default function ItemStylePanel({ showDesc, setShowDesc, treeOp, activeNodeKey, activeBox }) {

  const language = useContext(LanguageContext);

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
      <h2 className="title"><FontAwesomeIcon icon={faBoxes} /> {language.loc.flexItemRules}</h2>
      <div className='toggle-group--desc'>
        <input id='containerDescCheckbox' type="checkbox" checked={showDesc} onChange={() => setShowDesc(!showDesc)} />
        <label htmlFor='containerDescCheckbox'>{language.loc.showDesc}</label>
      </div>
      {showDesc &&
        <>
          <p>{language.loc.flexItemRulesDesc}</p>
          <p>
            <FlexMarkdown markdown={language.loc.axisTagDesc} />
          </p>
        </>
      }

      <h3 className="title--group">{language.loc.alignment}</h3>

      <div className='select-group'>
        <mark className="mark--blue">align-self</mark>
        <select
          value={getValue('alignSelf', '')}
          onChange={(e) => setStyle(e, 'alignSelf')}
        >
          <option value=''></option>
          <option value='stretch'>stretch</option>
          <option value='flex-start'>flex-start</option>
          <option value='flex-end'>flex-end</option>
          <option value='center'>center</option>
          <option value='baseline'>baseline</option>
        </select>
      </div>
      {showDesc &&
        <p className='description'>
          <FlexMarkdown markdown={language.loc.alignSelfDesc} />
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
          {language.loc.orderDesc}
        </p>
      }

      <h3 className="title--group">{language.loc.flexibility}</h3>

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
          <FlexMarkdown updateNode={treeOp.updateNode} markdown={language.loc.flexGrowDesc} />
        </p>
      }

      <div className='select-group'>
        <mark className="mark">flex-shrink</mark>
        <input
          value={getValue('flexShrink', '')}
          onChange={(e) => setStyle(e, 'flexShrink')}
          type="number"
          step="1"
          placeholder="1"
        />
      </div>
      {showDesc &&
        <p className='description'>
          <FlexMarkdown updateNode={treeOp.updateNode} markdown={language.loc.flexShrinkDesc} />
        </p>
      }

      <div className='select-group'>
        <mark className="mark">flex-basis</mark>
        <input
          value={getValue('flexBasis', '')}
          onChange={(e) => setStyle(e, 'flexBasis')}
          placeholder="Length (ex. auto, 20px, 20%, min-content)"
        />
      </div>
      {showDesc &&
        <p className='description'>
          <FlexMarkdown markdown={language.loc.flexBasisDesc} />
        </p>
      }

      <div className='select-group'>
        <mark className="mark">flex</mark>
        <div className="flex-property">
          {`${getValue('flexGrow', '0')} ${getValue('flexShrink', '1')} ${getValue('flexBasis', 'auto')}`}
        </div>
      </div>
      {showDesc &&
        <p className='description'>
          <FlexMarkdown markdown={language.loc.flexDesc} />
        </p>
      }
    </>
  );
}