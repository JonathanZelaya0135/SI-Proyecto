import './TableButton.css';

export default function DeleteButton({ handleClick, text }) {
  return (
    <button className="delete-button" onClick={handleClick}>{text}</button>
  );
}