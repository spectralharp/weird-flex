import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { LanguageContext } from '../context/language-context';
import FlexMarkdown from './FlexMarkdown';

import facts from '../data/examples.json'

export default function AboutPanel() {

  const language = useContext(LanguageContext);

  return (
    <>
      <h2 className="title"><FontAwesomeIcon icon={faQuestionCircle} /> {language.loc.about}</h2>
      <h3 className="title--group">{language.loc.whatsThis}</h3>
      <p>{language.loc.whatsThisParagraph}</p>
      <p><FlexMarkdown markdown={language.loc.boxAbout}/></p>
      <h3 className="title--group">{language.loc.selection}</h3>
      <p>{language.loc.selectionDescription}</p>
      <h3 className="title--group">{language.loc.resize}</h3>
      <p>{language.loc.resizeDescription}</p>
      <h3 className="title--group">{language.loc.pinning}</h3>
      <p>{language.loc.pinningDescription}</p>
    </>
  );
}