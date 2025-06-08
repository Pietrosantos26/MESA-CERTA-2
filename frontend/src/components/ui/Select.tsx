import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: Array<{
    value: string;
    label: string;
  }>;
  leftIcon?: React.ReactNode; // Reconhece a prop
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  options,
  className = '',
  id,
  leftIcon, // **CORREÇÃO:** Captura a prop aqui para não ser passada adiante
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <select id={selectId} className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 ${className}`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
    </div>
  );
};

export default Select;