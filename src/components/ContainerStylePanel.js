import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { LanguageContext } from '../context/language-context';
import FlexMarkdown from './FlexMarkdown';

export default function ContainerStylePanel({ showDesc, setShowDesc, treeOp, activeNodeKey, activeBox }) {

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
      <h2 className="title"><FontAwesomeIcon icon={faArchive} /> {language.loc.flexContainerRules}</h2>
      <div className='toggle-group--desc'>
        <input id='containerDescCheckbox' type="checkbox" checked={showDesc} onChange={() => setShowDesc(!showDesc)}/>
        <label htmlFor='containerDescCheckbox'>{language.loc.showDesc}</label>
      </div>
      {showDesc &&
        <>
          <p>
            {language.loc.flexContainerRulesDesc}
          </p>
          <p>
            <FlexMarkdown markdown={language.loc.axisTagDesc}/>
          </p>
        </>
      }

      <h3 className="title--group">{language.loc.display}</h3>

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
          <FlexMarkdown markdown={language.loc.displayDesc}/>
        </p>
      }

      <h3 className="title--group">{language.loc.orientation}</h3>

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
          <FlexMarkdown markdown={language.loc.flexDirectionDesc}/>
        </p>
      }

      <div className='select-group'>
        <mark className="mark">flex-wrap</mark>
        <select
          value={getValue('flexWrap', '')}
          onChange={(e) => setStyle(e, 'flexWrap')}
        >
          <option value=''></option>
          <option value='nowrap'>nowrap</option>
          <option value='wrap'>wrap</option>
          <option value='wrap-reverse' className='mark--blue'>wrap-reverse</option>
        </select>
      </div>
      {showDesc &&
        <p className='description'>
          <FlexMarkdown markdown={language.loc.flexWrapDesc}/>
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
          <FlexMarkdown markdown={language.loc.flexFlowDesc}/>
        </p>
      }

      <h3 className="title--group">{language.loc.alignment}</h3>

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
          <FlexMarkdown markdown={language.loc.justifyContentDesc}/>
        </p>
      }

      <div className='select-group'>
        <mark className="mark--blue">align-items</mark>
        <select
          value={getValue('alignItems', '')}
          onChange={(e) => setStyle(e, 'alignItems')}
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
          <FlexMarkdown markdown={language.loc.alignItemsDesc}/>
        </p>
      }

      <div className='select-group'>
        <mark className="mark--blue">align-content</mark>
        <select
          value={getValue('alignContent', '')}
          onChange={(e) => setStyle(e, 'alignContent')}
        >
          <option value=''></option>
          <option value='stretch'>stretch</option>
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
          <FlexMarkdown markdown={language.loc.alignContentDesc}/>
        </p>
      }
      {showDesc &&
        <p className='description'>
          <FlexMarkdown updateNode={treeOp.updateNode} markdown={language.loc.alignContentExample}/>
        </p>
      }
    </>
  );
}