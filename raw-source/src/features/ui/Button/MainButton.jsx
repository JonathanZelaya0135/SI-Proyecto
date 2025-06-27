import './MainButton.css'

export default function MainButton({ handleClick, text }) {
  return (
    <button className="main-button" onClick={handleClick}>{text}</button>
  );
}
