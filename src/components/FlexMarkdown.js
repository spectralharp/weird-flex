import examples from '../data/examples.json';
import { Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export default function FlexMarkdown({ markdown, updateNode }) {
  if(!markdown) return null;

  const tokens = [];
  let last = 0;

  markdown.replace(/\(([^)^()]+)\)\{([^}]+)\}/g, (match, base, className, offset, string) => {
    tokens.push(markdown.substring(last, offset));
    switch(className) {
      case 'strong':
        tokens.push(<strong>{base}</strong>);
        break;
      case 'example':
        if(updateNode) {
          const [text, example] = base.split(',');
          tokens.push(
            <button
              className='btn--example'
              onClick={() => updateNode('0', examples[example])}
            >
              <FontAwesomeIcon icon={faBook} /> {text}
            </button>
          );
        }
        break;
      default:
        tokens.push(<code className={className}>{base}</code>);
        break;
    }
    last = offset + base.length + className.length + 4;
    return base;
  });

  tokens.push(markdown.substring(last));

  return tokens.map((x, i) => <Fragment key={i}>{x}</ Fragment>);
}