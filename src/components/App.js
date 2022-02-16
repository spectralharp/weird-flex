import { useEffect, useState } from 'react';
import { useBounds } from '../hooks/useBounds';
import { useTree } from '../hooks/useTree';

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

function App() {

  const [shouldFix, setShouldFix] = useState(true);
  const [showDesc, setShowDesc] = useState(true);
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
    <>
      <Navbar />
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
      <main className='main'>
        <div className='dummy' ref={dummyRef}></div>
        <Tabs tabsRef={tabRef}>
          <AboutPanel
            label={<FontAwesomeIcon icon={faQuestionCircle} />}
          />
          <BoxSettingsPanel
            label={<FontAwesomeIcon icon={faSlidersH} />}
            treeOp={treeOp}
            activeNodeKey={activeNodeKey}
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
          <BoxCSSPanel
            label={<FontAwesomeIcon icon={faFileCode} />}
            activeBox={activeBox}
          />
          <SettingsPanel
            label={<FontAwesomeIcon icon={faCog}/>}
            treeOp={treeOp}
          />
        </Tabs>
      </main>
    </>
  );
}

export default App;
