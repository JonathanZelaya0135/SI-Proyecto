import './Input.css'

export default function Input({ type, placeholder, value, onChange }) {
  return (
    <div className="input-group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}