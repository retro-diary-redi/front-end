import { DiaryFormProps } from '@/models/DiaryData';
import { moodSvgList, weatherSvgList } from '@/utils/images';
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

function SelectModal({
  type,
  setShowSelectModal,
  formData,
  setFormData,
}: {
  type: string;
  setShowSelectModal: Dispatch<SetStateAction<boolean>>;
  formData: DiaryFormProps;
  setFormData: Dispatch<SetStateAction<DiaryFormProps>>;
}) {
  const moodButtonList = moodSvgList.map((moodSvg, index) => {
    return (
      <StyledButton
        type="button"
        key={index}
        onClick={() => {
          setShowSelectModal(false);
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

  const weatherButtonList = weatherSvgList.map((weatherSvg, index) => {
    return (
      <StyledButton
        type="button"
        key={index}
        onClick={() => {
          setShowSelectModal(false);
          setFormData({
            ...formData,
            weather: index,
          });
        }}
      >
        <img src={weatherSvg} alt="select mood" />
      </StyledButton>
    );
  });

  return (
    <div className="select-modal">
      {type === 'mood' && moodButtonList}
      {type === 'weather' && weatherButtonList}
    </div>
  );
}

export default SelectModal;
