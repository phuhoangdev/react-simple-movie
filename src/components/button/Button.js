const Button = ({ onClick, className = "", type = "button", full = false, bgColor = "primary", children }) => {
     let bgClassName = "bg-primary";
     switch (bgColor) {
          case "primary":
               bgClassName = "bg-primary";
               break;
          case "secondary":
               bgClassName = "bg-secondary";
               break;

          default:
               break;
     }
     return (
          <button type={type} onClick={onClick} className={`px-6 py-3 mt-auto rounded-lg ${full ? "w-full" : ""} ${bgClassName} ${className}`}>
               {children}
          </button>
     );
};

export default Button;
