import React, { useState } from 'react';
import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');
import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import { current_time_milliseconds, empty } from '../common/utils';
import styled from 'styled-components';

export default function QuillJsEditor(props) {
  const {
    id = 'QuillJsEditor' + current_time_milliseconds(),
    defaultValue = '',
    changeCallback = (quill, quillRef) => {
      // console.log('Text change!');
      // console.log(quill.getText()); // Get text only
      // console.log(quill.getContents()); // Get delta contents
      // console.log(quill.root.innerHTML); // Get innerHTML using quill
      // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
    },
  } = props;
  const counterRef = React.useRef();
  const { quill, quillRef } = useQuill();

  React.useEffect(() => {
    if (quill) {
      if (!empty(defaultValue) && empty(quill.getText())) {
        quill.clipboard.dangerouslyPasteHTML(defaultValue);
      }
      quill.on('text-change', (delta, oldDelta, source) => {
        if (`${source}` === `user`) changeCallback(quill, quillRef);
      });
    }
  }, [quill, quillRef, defaultValue, changeCallback]);

  return (
    <QuillJsEditorwrap id={id}>
      <div ref={quillRef} />
      <div ref={counterRef} />
    </QuillJsEditorwrap>
  );
}

const QuillJsEditorwrap = styled.div`
  width: 500;
  outline: none;
  cursor: pointer;
  height: 500;
  color: #f0ae44;
  :hover {
    color: #9c6104;
  }
`;
