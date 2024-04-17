import Button from '@/components/Button';
import { moodSvgList, weatherSvgList } from '@/utils/images';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  padding: 0%;

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    vertical-align: middle;
    margin: auto;
  }
`;

function SelectButton({
  type,
  index,
  onClick,
}: {
  type: string;
  index: number;
  onClick: () => void;
}) {
  return (
    <>
      <StyledButton type="button" width={32} height={32} onClick={onClick}>
        {type === 'mood' && <img src={moodSvgList[index]} alt="select mood" />}
        {type === 'weather' && (
          <img src={weatherSvgList[index]} alt="select weather" />
        )}
      </StyledButton>
    </>
  );
}

export default SelectButton;
