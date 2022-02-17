import { useEffect, useState } from 'react';
import { useBounds } from '../hooks/useBounds';
import { useTree } from '../hooks/useTree';
import { useLanguage, LanguageContext } from '../context/language-context';

import i18n from '../data/i18n.json';
import './App.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faArchive, faBoxes, faCog, faFileCode, faSlidersH } from '@fortawesome/free-solid-svg-icons';

import FlexBox from './FlexBox';
import Tabs from './Tabs';
import ContainerStylePanel from './ContainerStylePanel';
import ItemStylePanel from './ItemStylePanel';
import AboutPanel from './AboutPanel';
import BoxCSSPanel from './BoxCSSPanel';
import BoxSettingsPanel from './BoxSettingsPanel';
import Navbar from './NavBar';
import SettingsPanel from './SettingsPanel';
import TipBar from './TipBar';

function App() {

  const [language, changeLanguage, languageSelect] = useLanguage(i18n);
  const [shouldFix, setShouldFix] = useState(true);
  const [showDesc, setShowDesc] = useState(localStorage.getItem('showDesc') === 'true');

  useEffect(() => {
    localStorage.setItem('showDesc', showDesc)
  }, [showDesc])

  const [root, treeOp] = useTree({
    width: 600,
    height: 600,
    style: {},
    nodes: [ {}, {}, {}, {}, {} ]
  });

  const [activeNodeKey, setActiveNodeKey] = useState('0');
  const [activeBox, setActiveBox] = useState(root);

  useEffect(() => {
    setActiveBox(treeOp.getNode(activeNodeKey));
  }, [activeNodeKey, root]);

  const [dummyBounds, dummyRef, updateDummyBounds] = useBounds();
  const [tabBounds, tabRef, updateTabBounds] = useBounds();
  const [tipText, setTipText] = useState('');

  useEffect(() => {
    updateTabBounds();
  }, [dummyBounds]);

  useEffect(() => {
    function updateFixed() {
      if(tabBounds.top > dummyBounds.bottom) {
        setShouldFix(false);
      }
    }

    window.addEventListener('scroll', updateFixed);
    window.addEventListener('resize', updateFixed);
    return () => {
      window.removeEventListener('scroll', updateFixed)
      window.removeEventListener('resize', updateFixed);
    };
  });

  return (
    <LanguageContext.Provider value={language}>
      <Navbar languageSelect={languageSelect}/>
      <FlexBox
        item={root}
        isRoot
        dummy={dummyRef}
        nodeKey={'0'}
        shouldFix={shouldFix}
        setShouldFix={setShouldFix}
        activeNodeKey={activeNodeKey}
        setActiveNodeKey={setActiveNodeKey}
        treeOp={treeOp}
      />
      <TipBar text={tipText}/>
      <main className='main'>
        <div className='dummy' ref={dummyRef}></div>
        <Tabs tabsRef={tabRef}>
          <AboutPanel
            label={<FontAwesomeIcon icon={faQuestionCircle} />}
          />
          <BoxCSSPanel
            label={<FontAwesomeIcon icon={faFileCode} />}
            activeBox={activeBox}
          />
          <ContainerStylePanel
            label={<FontAwesomeIcon icon={faArchive}/>}
            showDesc={showDesc}
            setShowDesc={setShowDesc}
            treeOp={treeOp}
            activeNodeKey={activeNodeKey}
            activeBox={activeBox}
          />
          <ItemStylePanel
            label={<FontAwesomeIcon icon={faBoxes} />}
            showDesc={showDesc}
            setShowDesc={setShowDesc}
            treeOp={treeOp}
            activeNodeKey={activeNodeKey}
            activeBox={activeBox}
          />
          <BoxSettingsPanel
            label={<FontAwesomeIcon icon={faSlidersH} />}
            treeOp={treeOp}
            activeNodeKey={activeNodeKey}
            activeBox={activeBox}
          />
          <SettingsPanel
            label={<FontAwesomeIcon icon={faCog}/>}
            treeOp={treeOp}
          />
        </Tabs>
      </main>
    </LanguageContext.Provider>
  );
}

export default App;
