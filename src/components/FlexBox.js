import './FlexBox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useBounds } from '../hooks/useBounds';

export default function FlexBox({ item, index, isRoot, dummy,
  shouldFix, setShouldFix, nodeKey, treeOp, activeNodeKey, setActiveNodeKey }) {

  const { style, nodes, camouflage } = item;

  const [bound, ref, updateBound] = useBounds();
  const [mouseDownBound, setMouseDownBound] = useState(bound);

  const [vertical, setVertical] = useState({ direction: 'down', main: false });
  const [horizontal, setHorizontal] = useState({ direction: 'right', main: true });

  function updateActive(e) {
    if (ref && ref.current === e.target) {
      if (activeNodeKey === nodeKey) {
        const update = { width: bound.width, height: bound.height }
        treeOp.updateNode(nodeKey,  Object.assign({}, item, {...update }));
        if (mouseDownBound.width === bound.width && mouseDownBound.height === bound.height) {
          setActiveNodeKey(null);
        }
      } else {
        setActiveNodeKey(nodeKey);
      }
    }
  }

  function isPortrait() {
    return bound.height > bound.width;
  }

  // On mount set this box to default dimensions
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.width  = item.width  ? `${item.width}px`  : undefined;
      ref.current.style.height = item.height ? `${item.height}px` : undefined;
    }
  }, []);

  useEffect(() => {
    if (isRoot && dummy && dummy.current) {
      dummy.current.style.width = `${bound.width}px`;
      dummy.current.style.height = `${bound.height}px`;
    }
  }, [bound]);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.width  = item.width  ? `${item.width}px`  : '';
      ref.current.style.height = item.height ? `${item.height}px` : '';
    }
  }, [item]);

  useEffect(() => {
    updateAxis(style);
  }, [style]);

  const camouflageComponent = getCamouflage(camouflage);

  /**
   * Updates the axis around the box based on the flex-direction and flex-wrap applied
   */
  function updateAxis(style) {
    if (!style) return;
    const normalWrap = style.flexWrap !== "wrap-reverse";
    switch (style.flexDirection) {
      case "column":
        setVertical({ direction: 'down', main: true });
        if (normalWrap) {
          setHorizontal({ direction: 'right', main: false });
        } else {
          setHorizontal({ direction: 'left', main: false });
        }
        break;
      case "column-reverse":
        setVertical({ direction: 'up', main: true });
        if (normalWrap) {
          setHorizontal({ direction: 'right', main: false });
        } else {
          setHorizontal({ direction: 'left', main: false });
        }
        break;
      case "row-reverse":
        setHorizontal({ direction: 'left', main: true });
        if (normalWrap) {
          setVertical({ direction: 'down', main: false });
        } else {
          setVertical({ direction: 'up', main: false });
        }
        break;
      default:
        setHorizontal({ direction: 'right', main: true });
        if (normalWrap) {
          setVertical({ direction: 'down', main: false });
        } else {
          setVertical({ direction: 'up', main: false });
        }
    }
  }

  let additional = '';

  if (nodeKey === activeNodeKey) {
    additional += 'active'
  }

  if (isRoot) {
    additional += ' root';
    if (shouldFix) {
      additional += ' fix';
    } else {
      additional += ' abs';
    }
  }

  return (
    <div
      className={`flexbox ${additional}`}
      tabIndex="0"
      data-index={index}
      ref={ref}
      onClick={updateActive}
      onMouseDown={() => setMouseDownBound(bound)}
      style={style}
    >
      {
        nodes &&
        nodes.map((item, index) =>
          <FlexBox
            key={`${nodeKey}${index}`}
            index={index}
            item={item}
            nodeKey={`${nodeKey}${index}`}
            treeOp={treeOp}
            activeNodeKey={activeNodeKey}
            setActiveNodeKey={setActiveNodeKey}
          />
        )
      }
      {camouflageComponent}
      {style ? (
        style.display === 'flex' ?
          <>
            <div className={`flexbox__horizontal ${horizontal.main ? 'main-axis' : 'cross-axis'}`}>
              <div className={`scroll-bg ${horizontal.direction}`}>
              </div>
              <div className="axis__label">
                {bound.width > 170 && (horizontal.main ? 'main axis' : 'cross axis')}
              </div>
            </div>
            <div className={`flexbox__vertical ${vertical.main ? 'main-axis' : 'cross-axis'}`}>
              <div className={`scroll-bg ${vertical.direction}`}>
              </div>
              <div className="axis__label">
                {bound.height > 170 && (vertical.main ? 'main axis' : 'cross axis')}
              </div>
            </div>
          </> :
          <>
            <div className="flexbox__horizontal">
              <div className="axis__label">
                {bound.width > 170 && !isPortrait() && `display: ${style.display ? style.display : 'block'}`}
              </div>
            </div>
            <div className="flexbox__vertical">
              <div className="axis__label">
                {bound.height > 170 && isPortrait() && `display: ${style.display ? style.display : 'block'}`}
              </div>
            </div>
          </>
      ) :
        <>
          <div className="flexbox__horizontal">
            <div className="axis__label">
              {bound.width > 170 && !isPortrait() && 'display: block'}
            </div>
          </div>
          <div className={`flexbox__vertical`}>
            <div className="axis__label">
              {bound.height > 170 && isPortrait() && 'display: block'}
            </div>
          </div>
        </>
      }
      {isRoot ?
        <button className="flexbox__remove-btn" onClick={() => setShouldFix(!shouldFix)}>
          <FontAwesomeIcon icon={faThumbtack} style={{ color: shouldFix ? 'white' : 'silver' }} />
        </button> :
        <button className="flexbox__remove-btn" onClick={() => treeOp.removeNode(nodeKey)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      }
    </div>
  );
}

function getCamouflage(camouflage) {
  if (!camouflage) return null;
  switch (camouflage) {
    case 'title':
      return <h2 className='camouflage'>Weird Flex</h2>;
    case 'paragraph':
      return (
        <p className='camouflage'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel porta eros. Curabitur
          ut cursus erat. Vivamus vehicula commodo odio, et sagittis dui malesuada vel. Sed laoreet
          arcu vel erat feugiat sodales. In augue tortor, faucibus ut mauris quis, dictum pharetra
          purus. Mauris sed malesuada urna, eu accumsan ipsum.
        </p>
      );
    case 'image':
      return <img className='camouflage' src='images/flex.svg' alt='Placeholder' />;
    default:
      return null;
  }
}