const Input = ({ label, id, value, onChange, Error, isArea = false, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1">
        {isArea ?
          <textarea
            id={id}
            name={id}
            type="text"
            className="block w-full p-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...props}
          />
          : <input
            id={id}
            name={id}
            type="text"
            className="block w-full p-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...props}
          />}
      </div>
      {Error && <Error />}
    </div>
  );
};

export default Input;
