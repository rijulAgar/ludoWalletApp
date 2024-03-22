import React from 'react';
import './InputComponent.css';

interface InputFieldProps {
  type: string;
  label: string;
  value: any;
  placeholder: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ type, label, value,placeholder, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className='my-3'>
      <label htmlFor={label} className="form-label cus_label">{label}</label>
      <input 
        type={type} 
        className="form-control cus_input" 
        id={label} 
        placeholder={placeholder}
        value={value} 
        onChange={handleChange} 
      />
    </div>
  );
};

export default InputField;