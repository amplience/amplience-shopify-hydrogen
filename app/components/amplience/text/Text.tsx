import ReactMarkdown from 'markdown-to-jsx';

/**
 * TOOD
 */
type TextProps = {
  text: string;
  align:
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent';
};

/**
 * Text component
 * @param text string containing markdown text
 * @param align text alignment
 * @returns Text component using markdown to HTML
 */
const Text: React.FC<TextProps> = ({ text, align }) => {
  return (
    <div className="markdown" style={{ textAlign: align }}>
      {text && <ReactMarkdown>{text}</ReactMarkdown>}
    </div>
  );
};

export default Text;
