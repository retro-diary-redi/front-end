import Button from '@/components/Button';
import { moodSvgList } from '@/utils/images';
import styled from 'styled-components';

const MoodButton = styled(Button)`
  padding: 0%;

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    vertical-align: middle;
    margin: auto;
  }
`;

function MoodSelectButton({
  mood,
  onClick,
}: {
  mood: number;
  onClick: () => void;
}) {
  return (
    <>
      <MoodButton type="button" width={32} height={32} onClick={onClick}>
        <img src={moodSvgList[mood]} alt="select mood" />
      </MoodButton>
    </>
  );
}

export default MoodSelectButton;
