import { useState } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { IconColorPicker } from '@tabler/icons-react';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import ContentRenderer from './ContentRenderer';

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export default function Editor() {
  const [contentSavedHtml, setContentSavedHtml] = useState();
  const [contentSavedJson, setContentSavedJson] = useState();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        table: false,
      }),
      Underline,
      Link,
      TextStyle,
      Color,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
  });

  const handleSave = () => {
    const html = editor?.getHTML();
    setContentSavedHtml(html);
    const json = editor?.getJSON();
    setContentSavedJson(json);
    console.log(
      'Saved content json:',
      contentSavedJson ? contentSavedJson.content : null,
    );
    console.log('Saved content html:', contentSavedHtml);
  };

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ColorPicker
            colors={[
              '#25262b',
              '#868e96',
              '#fa5252',
              '#e64980',
              '#be4bdb',
              '#7950f2',
              '#4c6ef5',
              '#228be6',
              '#15aabf',
              '#12b886',
              '#40c057',
              '#82c91e',
              '#fab005',
              '#fd7e14',
            ]}
          />

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control interactive={false}>
              <IconColorPicker size={16} stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }>
              Insert Table
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor?.chain().focus().addColumnBefore().run()}>
              Add Column Before
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor?.chain().focus().addColumnAfter().run()}>
              Add Column After
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor?.chain().focus().addRowBefore().run()}>
              Add Row Before
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor?.chain().focus().addRowAfter().run()}>
              Add Row After
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor?.chain().focus().deleteTable().run()}>
              Delete Table
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor?.chain().focus().deleteRow().run()}>
              Delete Row
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor?.chain().focus().deleteColumn().run()}>
              Delete Column
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor?.chain().focus().splitCell().run()}>
              Split Cell
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor?.chain().focus().splitBlock().run()}>
              Delete Row
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.UnsetColor />
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSave}>Save</button>
      </div>
      <div
        className="rich-preview"
        dangerouslySetInnerHTML={{ __html: contentSavedHtml }}
      />
      <p>Json Content</p>
      {contentSavedJson && (
        <ContentRenderer content={contentSavedJson.content} />
      )}
    </>
  );
}
