import { useEffect, useRef, useState } from 'react';
import './App.scss';

import Logo from '../images/logo.svg';
import FlexBox from './FlexBox';
import Tabs from './Tabs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faQuestionCircle, faArchive, faBoxes, faCog, faFileCode, faSlidersH } from '@fortawesome/free-solid-svg-icons';

import ContainerStylePanel from './ContainerStylePanel';
import ItemStylePanel from './ItemStylePanel';
import AboutPanel from './AboutPanel';
import BoxCSSPanel from './BoxCSSPanel';
import BoxSettingsPanel from './BoxSettingsPanel';
import { useBounds } from '../hooks/useBounds';

function App() {

  const [shouldFix, setShouldFix] = useState(true);
  const [showDesc, setShowDesc] = useState(true);

  const [box, setBox] = useState({
    width: 600,
    height: 600,
    style: {},
    boxes: [ {}, {}, {}, {}, {} ]
  });

  const [activeNodeKey, setActiveNodeKey] = useState('0');
  const [activeBox, setActiveBox] = useState(box);

  useEffect(() => {
    setActiveBox(getActiveBox(activeNodeKey));
  }, [activeNodeKey, box]);


  function getActiveBox(nodeKey) {
    // If the key is null, the box is null
    if(nodeKey === null) return null;
    // Get the path to the box from the key
    let path = nodeKey.split('').map(x => parseInt(x));
    // The first node maps to the root, so we just shift it
    path.shift();
    // And grab the root
    let current = box;
    // We go down the path
    while(path.length > 0) {
      current = current.boxes[path.shift()];
    }
    return current;
  }

  function addChildNode(nodeKey) {
    if(nodeKey === null) return null;

    // Copy the box so we don't mutate the original
    const newBox = {...box};

    let path = nodeKey.split('').map(x => parseInt(x));
    path.shift();
    let current = newBox;

    // We go down the path
    while(path.length > 0) {
      current = current.boxes[path.shift()];
    }

    if(!current.boxes) {
      current.boxes = [];
    }

    current.boxes.push({});

    setBox(newBox);
  }

  function updateNode(nodeKey, updated) {
    if(nodeKey === null) return;

    // Copy the box so we don't mutate the original
    const newBox = {...box};

    let path = nodeKey.split('').map(x => parseInt(x));

    path.shift();
    let current = newBox;

    // If there's no path, we're changing the root itself
    if(path.length === 0) {
      setBox(updated);
    } else {
      // We go down the path
      while(path.length > 1) {
        current = current.boxes[path.shift()];
      }

      // Change it to updated;
      current.boxes[path.shift()] = updated;
      setBox(newBox);
    }
  }

  function removeNode(nodeKey) {
    if(nodeKey === null) return;

    // Copy the box so we don't mutate the original
    const newBox = {...box};

    let path = nodeKey.split('').map(x => parseInt(x));

    path.shift();
    let current = newBox;

    // If there's no path, we're removing the root itself, don't
    if(path.length === 0) {
      console.error('Cannot remove root node');
    } else {
      // We go down the path
      while(path.length > 1) {
        current = current.boxes[path.shift()];
      }

      // Splice the node we want to remove in place
      current.boxes.splice(path.shift(), 1);
      setBox(newBox);
    }
  }

  function duplicateNode(nodeKey) {
    if(nodeKey === null) return;

    // Copy the box so we don't mutate the original
    const newBox = {...box};

    let path = nodeKey.split('').map(x => parseInt(x));

    path.shift();
    let current = newBox;

    // If there's no path, we're duplicating the root itself, don't
    if(path.length === 0) {
      console.error('Cannot duplicate root node');
    } else {
      // We go down the path
      while(path.length > 1) {
        current = current.boxes[path.shift()];
      }

      // Push a node that is the same as this one
      try {
        const newNode = JSON.parse(JSON.stringify(current.boxes[path.shift()]));
        current.boxes.push(newNode);
        setBox(newBox);
      } catch (e) {
        console.error('Failed to clone node', e);
      }
    }
  }

  const treeOp = {
    updateNode, removeNode, duplicateNode, addChildNode
  }

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
      <nav className='nav'>
        <h1 className='flexing-title'><span className="flexee">Weird Flex</span> <span className="muscle">💪</span></h1>
        <ul className='nav__links'>
          <li className='nav__link'>
            <a href="https://github.com/spectralharp/weird-flex" target='_blank' rel='noreferrer'>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
          <li className='nav__link'>
            <a href="https://bychao.com/" target='_blank' rel='noreferrer'>
              <img src={Logo} alt='Logo' />
            </a>
          </li>
        </ul>
      </nav>
      <FlexBox
        item={box}
        isRoot
        dummy={dummyRef}
        depth={0}
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
          <section label={<FontAwesomeIcon icon={faQuestionCircle} />}>
            <AboutPanel />
          </section>
          <section label={<FontAwesomeIcon icon={faSlidersH} />}>
            <BoxSettingsPanel
              treeOp={treeOp}
              activeNodeKey={activeNodeKey}
              activeBox={activeBox}
            />
          </section>
          <section label={<FontAwesomeIcon icon={faArchive} />}>
            <ContainerStylePanel
              showDesc={showDesc}
              setShowDesc={setShowDesc}
              treeOp={treeOp}
              activeNodeKey={activeNodeKey}
              activeBox={activeBox}
            />
          </section>
          <section label={<FontAwesomeIcon icon={faBoxes} />}>
            <ItemStylePanel
              showDesc={showDesc}
              setShowDesc={setShowDesc}
              treeOp={treeOp}
              activeNodeKey={activeNodeKey}
              activeBox={activeBox}
            />
          </section>
          <section label={<FontAwesomeIcon icon={faFileCode} />}>
            <BoxCSSPanel />
          </section>
          <section label={<FontAwesomeIcon icon={faCog} />}>
            <h2 className="collapse active">Settings</h2>
            <div className="collapse-content">
              <ul>
                <li>
                  <h4>Mute Sound</h4>
                  <input type="checkbox" id="mute-checkbox" aria-label="Mute sound checkbox" />
                </li>
              </ul>
            </div>
          </section>
        </Tabs>
      </main>
    </>
  );
}

export default App;
