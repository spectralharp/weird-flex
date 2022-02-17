import './Panel.scss';
import Prism from "prismjs";
import "prism-themes/themes/prism-a11y-dark.min.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../context/language-context';

export default function BoxCSSPanel({ activeBox }) {

  const language = useContext(LanguageContext);
  const [cssCode, setCssCode] = useState(toCSS(activeBox));
  const [htmlCode, setHtmlCode] = useState(toHtml(activeBox));

  useEffect(() => {
    setHtmlCode(toHtml(activeBox, 0));
    setCssCode(toCSS(activeBox, 0));
  }, [activeBox])

  useEffect(() => {
    Prism.highlightAll();
  }, [cssCode, htmlCode]);

  return (
    <>
      <h2 className="title"><FontAwesomeIcon icon={faFileCode} /> {language.loc.markup}</h2>
      <p>{language.loc.markupDescription}</p>

      <pre>
        <code className={'language-html'}>{htmlCode}</code>
      </pre>

      <pre>
        <code className={'language-css'}>{cssCode}</code>
      </pre>
    </>
  );
}

function toHtml(root, indent) {
  if(!root) return '';
  const indentation = ' '.repeat(indent);
  switch(root.camouflage) {
    case 'title':
      return indentation + `<h1${indent === 0 ? ' id="box"' : ''}>Title</h1>`;
    case 'paragraph':
      return indentation + `<p${indent === 0 ? ' id="box"' : ''}>Lorem Ipsum...</p>`;
    case 'image':
      return indentation + `<img${indent === 0 ? ' id="box"' : ''} src="placeholder.png" alt="placeholder"/>`;
    default:
      return `${indentation}<div${indent === 0 ? ' id="box"' : ''}>${root.nodes ? '\n' + root.nodes.map(node => toHtml(node, indent + 2)).join('\n') + `\n${indentation}` : ''}</div>`;
  }
}

function toCSS(root, indent) {
  if(!root) return '';
  const { width, height } = root;
  let { style } = root;
  if(!style) {
    style = {};
  }

  const {
    display, flexDirection, flexWrap, justifyContent, alignItems, alignContent,
    alignSelf, order, flexGrow, flexShrink, flexBasis,
    writingMode
  } = style;

  let code = '';

  if (width) {
    code += `  width: ${width}px;\n`
  }
  if (height) {
    code += `  height: ${height}px;\n`
  }

  if (display) {
    code += `  display: ${display};\n`
  }

  if (flexDirection) {
    if(flexWrap) {
      code += `  flex-flow: ${flexDirection} ${flexWrap};\n`
    } else {
      code += `  flex-direction: ${flexDirection};\n`
    }
  } else if(flexWrap) {
    code += `  flex-wrap: ${flexWrap};\n`
  }

  if (justifyContent) {
    code += `  justify-content: ${justifyContent};\n`
  }

  if (alignItems) {
    code += `  align-items: ${alignItems};\n`
  }

  if (alignContent) {
    code += `  align-content: ${alignContent};\n`
  }



  if (alignSelf) {
    code += `  align-self: ${alignSelf};\n`
  }

  if (order) {
    code += `  order: ${order};\n`
  }

  if(flexGrow && flexShrink && flexBasis) {
    code += `  flex: ${flexGrow} ${flexShrink} ${flexBasis};\n`
  } else {
    if (flexGrow) {
      code += `  flex-grow: ${flexGrow};\n`
    }

    if (flexShrink) {
      code += `  flex-shrink: ${flexShrink};\n`
    }

    if (flexBasis) {
      code += `  flex-basis: ${flexBasis};\n`
    }
  }



  if (writingMode) {
    code += `  writing-mode: ${writingMode};\n`
  }

  return `#box {\n${code}}`;
}