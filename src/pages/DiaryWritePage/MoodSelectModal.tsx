import { WriteFormProps } from '@/models/DiaryData';
import { moodSvgList } from '@/utils/images';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0;

  width: 32px;
  height: 32px;
  background-color: transparent;
  border: 1px solid black;

  &:hover {
    background-color: var(--secondary);
    cursor: pointer;
  }

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    vertical-align: middle;
    margin: auto;
  }
`;

function MoodSelectModal({
  setShowMoodSelectModal,
  setMood,
  formData,
  setFormData,
}: {
  setShowMoodSelectModal: Dispatch<SetStateAction<boolean>>;
  setMood: Dispatch<SetStateAction<number>>;
  formData: WriteFormProps;
  setFormData: Dispatch<SetStateAction<WriteFormProps>>;
}) {
  const buttonList = moodSvgList.map((moodSvg, index) => {
    return (
      <StyledButton
        type="button"
        key={index}
        onClick={() => {
          setShowMoodSelectModal(false);
          setMood(index);
          setFormData({
            ...formData,
            mood: index,
          });
        }}
      >
        <img src={moodSvg} alt="select mood" />
      </StyledButton>
    );
  });

  return <div className="mood-select-modal">{buttonList}</div>;
}

export default MoodSelectModal;
