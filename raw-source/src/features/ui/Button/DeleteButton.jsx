import './TableButton.css';

export default function DeleteButton({ handleClick, text, disabled }) {
  return (
    <button
      className="delete-button"
      onClick={handleClick}
      disabled={disabled}
      style={{ 
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {text}
    </button>
  );
}
