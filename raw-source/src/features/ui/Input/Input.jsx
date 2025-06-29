import './Input.css'

export default function Input({ name, type, placeholder, value, onChange }) {
  return (
    <div className="input-group">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}