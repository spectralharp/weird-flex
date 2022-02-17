import { useEffect, useState } from "react";

export default function TipBar({ text }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if(text) {
      setShow(true);
    }
  }, [text]);

  return show && (
    <div className='tip'>
      <p>{text}</p>
      <button
      className='btn--danger'
      onClick={() => setShow(false)}
      >
        ×
      </button>
    </div>
  );
}