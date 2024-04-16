import Button from '@/components/Button';
import styled from 'styled-components';
import weatherSelectImage from '@/assets/images/weather_rainbow.svg';
import { weatherSvgList } from '@/utils/images';

const WeatherButton = styled(Button)`
  padding: 0%;

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    vertical-align: middle;
    margin: auto;
  }
`;

function WeatherSelectButton({
  weather,
  onClick,
}: {
  weather: number;
  onClick: () => void;
}) {
  return (
    <WeatherButton type="button" width={32} height={32} onClick={onClick}>
      <img src={weatherSvgList[weather]} alt="select weather" />
    </WeatherButton>
  );
}

export default WeatherSelectButton;
