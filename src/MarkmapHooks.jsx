import React, { useState, useRef, useEffect } from 'react';
import { Markmap } from 'markmap-view';
import { transformer } from './markup';
import { Toolbar } from 'markmap-toolbar';
import 'markmap-toolbar/dist/style.css';

const initValue = `# Markmap

- Beautiful
- Useful
- Rose
  - Red
    - Dark Red
    - Light Red
  - Pink
  - White
- Another Topic
  - Subtopic A
    - Detail A1
    - Detail A2
  - Subtopic B
  - Subtopic C
`;

function renderToolbar(mm, wrapper) {
  while (wrapper?.firstChild) wrapper.firstChild.remove();
  if (mm && wrapper) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);

    toolbar.register({
      id: 'alert',
      title: 'Click to show an alert',
      content: 'Alert',
      onClick: () => alert('You made it!'),
    });

    toolbar.setItems([...Toolbar.defaultItems, 'alert']);
    wrapper.append(toolbar.render());
  }
}

export default function MarkmapHooks() {
  const [value, setValue] = useState(initValue);
  const [savedData, setSavedData] = useState(null); // For storing the transformed data
  const refSvg = useRef(null);
  const refMm = useRef(null);
  const refToolbar = useRef(null);

  useEffect(() => {
    if (refMm.current || !refSvg.current) return;
    const mm = Markmap.create(refSvg.current);
    refMm.current = mm;
    renderToolbar(mm, refToolbar.current);
  }, []);

  useEffect(() => {
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(value);

    // Save the transformed data to state and log it
    setSavedData(root);
    console.log('Saved Data (Transformed):', root);

    mm.setData(root).then(() => {
      mm.fit();
    });
  }, [value]);

  const loadSavedData = () => {
    if (savedData) {
      const mm = refMm.current;
      mm.setData(savedData).then(() => {
        mm.fit();
      });
      console.log('Loaded Saved Data:', savedData);
    } else {
      console.log('No saved data to load');
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen p-4 gap-4">
      <textarea
        className="mind-map-container border border-gray-300 rounded p-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="mind-map-container relative">
        <svg className="container" ref={refSvg} />
        <div className="absolute bottom-2 right-2" ref={refToolbar}></div>
      </div>

      {/* Button to load the saved data */}
      <button
        onClick={loadSavedData}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        disabled={!savedData}>
        Load Saved Data
      </button>
    </div>
  );
}
