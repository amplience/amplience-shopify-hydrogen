import type {ContentItem} from '~/clients/amplience/create-dc-content-client.types';
import ReactMarkdown from 'markdown-to-jsx';

type TextProps = {
    text: string;
    align: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
}

/**
 * Text component
 * @param param0 object containing content data
 * @returns Text component using markdown to HTML
 */
const Text: React.FC<TextProps> = ({text, align}) => {
    return (
        <div className="markdown" style={{textAlign: align}}>
            {
              text && <ReactMarkdown>{text}</ReactMarkdown>
            }
        </div>
    )
}

export default Text;