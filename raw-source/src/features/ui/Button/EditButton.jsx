import './TableButton.css';

export default function EditButton({ handleClick, text }) {
  return (
    <button className="edit-button" onClick={handleClick}>{text}</button>
  );
}