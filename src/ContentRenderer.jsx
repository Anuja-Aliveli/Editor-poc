import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ContentRenderer = ({ content }) => {
  return (
    <div>
      {content.map((block, index) => {
        switch (block.type) {
          case 'heading':
            const Tag = `h${block.attrs?.level || 1}`;
            return (
              <Tag
                key={index}
                style={{ textAlign: block.attrs?.textAlign || 'left' }}>
                {renderContent(block.content)}
              </Tag>
            );

          case 'paragraph':
            return (
              <p
                key={index}
                style={{ textAlign: block.attrs?.textAlign || 'left' }}>
                {renderContent(block.content)}
              </p>
            );

          case 'bulletList':
            return (
              <ul key={index}>
                {block.content.map((item, idx) => (
                  <li key={idx}>{renderContent(item.content[0].content)}</li>
                ))}
              </ul>
            );

          case 'orderedList':
            return (
              <ol key={index}>
                {block.content.map((item, idx) => (
                  <li key={idx}>{renderContent(item.content[0].content)}</li>
                ))}
              </ol>
            );

          case 'table':
            return <TableBlock key={index} data={block.content} />;

          case 'chart':
            return (
              <ChartBlock
                key={index}
                chartType={block.attrs.chartType}
                data={block.attrs.data}
                options={block.attrs.options}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

// Renders an array of content (e.g. paragraph's children)
const renderContent = (content) => {
  return content.map((node, i) => {
    if (node.type === 'text') {
      return applyMarks(node.text, node.marks, i);
    }
    return null;
  });
};

// Applies marks like bold, italic, underline, link, etc.
const applyMarks = (text, marks = [], key) => {
  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case 'bold':
        return <strong key={key}>{acc}</strong>;
      case 'italic':
        return <em key={key}>{acc}</em>;
      case 'underline':
        return <u key={key}>{acc}</u>;
      case 'strike':
        return <s key={key}>{acc}</s>;
      case 'code':
        return <code key={key}>{acc}</code>;
      case 'subscript':
        return <sub key={key}>{acc}</sub>;
      case 'superscript':
        return <sup key={key}>{acc}</sup>;
      case 'link':
        return (
          <a
            key={key}
            href={mark.attrs.href}
            target={mark.attrs.target || '_blank'}
            rel={mark.attrs.rel || 'noopener noreferrer'}
            className={mark.attrs.class || ''}>
            {acc}
          </a>
        );
      default:
        return acc;
    }
  }, text);
};

const TableBlock = ({ data }) => (
  <table
    border="1"
    cellPadding="8"
    style={{ borderCollapse: 'collapse', marginBottom: '20px' }}>
    <thead>
      <tr>
        {data[0].content.map((cell, i) => (
          <th key={i}>
            {cell.content?.[0]?.content
              ? renderContent(cell.content[0].content)
              : null}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.slice(1).map((row, rIdx) => (
        <tr key={rIdx}>
          {row.content.map((cell, cIdx) => (
            <td key={cIdx}>
              {cell.content?.[0]?.content
                ? renderContent(cell.content[0].content)
                : null}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const ChartBlock = ({ chartType, data, options }) => {
  if (chartType === 'bar') {
    return <Bar data={data} options={options} />;
  }
  return <p>Unsupported chart type</p>;
};

export default ContentRenderer;
