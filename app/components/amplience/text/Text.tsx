import type {ContentItem} from '~/clients/amplience/create-dc-content-client.types';
import ReactMarkdown from 'markdown-to-jsx';

/**
 * Text component
 * @param param0 object containing content data
 * @returns Text component using markdown to HTML
 */
const Text = ({content}: {content: ContentItem}) => {
    return (
        <div className="markdown">
            {
              content?.text && <ReactMarkdown>{content.text}</ReactMarkdown>
            }
        </div>
    )
}

export default Text;