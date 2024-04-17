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

  &:disabled {
    cursor: default;
  }
`;

function SelectButton({
  status,
  type,
  index,
  onClick,
}: {
  status: string;
  type: string;
  index: number;
  onClick: () => void;
}) {
  return (
    <StyledButton
      disabled={status === 'view'}
      type="button"
      className="select-button"
      width={32}
      height={32}
      onClick={onClick}
    >
      {type === 'mood' && (
        <img
          src={moodSvgList[index]}
          alt="select mood"
          className="select-button"
        />
      )}
      {type === 'weather' && (
        <img
          src={weatherSvgList[index]}
          alt="select weather"
          className="select-button"
        />
      )}
    </StyledButton>
  );
}

export default SelectButton;
