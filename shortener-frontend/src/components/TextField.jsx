const TextField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  value,
  placeholder,
}) => {
  // Final pattern: allows www., with or without http(s), and standard TLDs
  const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/

  const validationRules = {
    required: { value: required, message },
    ...(min && {
      minLength: { value: min, message: "Minimum 6 characters required" },
    }),
    ...(type === "url" && {
      pattern: {
        value: urlPattern,
        message: "Please enter a valid URL",
      },
    }),
    ...(type === "email" && {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email",
      },
    }),
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={`${className || ""} font-semibold text-md`}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`px-2 py-2 border outline-none bg-transparent text-slate-700 rounded-md ${
          errors[id]?.message ? "border-red-500" : "border-slate-600"
        }`}
        {...register(id, validationRules)}
      />

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {errors[id].message}*
        </p>
      )}
    </div>
  );
};

export default TextField;
