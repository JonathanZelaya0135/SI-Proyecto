import './TableButton.css';

export default function EditButton({ handleClick, text, disabled = false }) {
  return (
    <button onClick={handleClick} disabled={disabled} className="edit-button">
      {text}
    </button>
  );
}
