import {type FC} from 'react';
import {type CmsContent} from '~/amplience/getImageURL';

type VideoProps = {} & CmsContent;

/**
 * Video Component
 * @param video object containing all video information
 * @returns Video component
 */
const Video: FC<VideoProps> = ({video}) => {
  if (!video) {
    return null;
  }
  return (
    <div>
      <video
        className="amp-dc-video"
        style={{width: '100%'}}
        poster={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}?protocol=https`}
        controls
        src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_720p?protocol=https`}
      >
        <source
          src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_720p?protocol=https`}
          data-res="High"
          data-bitrate="2119"
          data-label="High"
          type="video/mpeg4"
        />

        <source
          src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_480p?protocol=https`}
          data-res="Medium"
          data-bitrate="689"
          data-label="Medium"
          type="video/mpeg4"
        />

        <source
          src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/webm_480p?protocol=https`}
          data-res="Medium"
          data-bitrate="624"
          data-label="Medium"
          type="video/webm"
        />
      </video>
      <div className="pause-button inactive"></div>
    </div>
  );
};

export default Video;
