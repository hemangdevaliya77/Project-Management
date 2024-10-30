import React, { useState, useRef, useEffect } from "react";

function CustomDropDown({ options, selectedValue, onChange, label, ishome }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (option) => {
    if (option.link) {
      window.location.href = option.link;
    } else {
      onChange(option);
    }
    setIsOpen(false);

    
  };

  return (
    <div ref={dropDownRef} style={{ width: 'max-content' }}>
      <button
        onClick={handleToggle}
        style={{ padding: "10px", cursor: "pointer", minWidth: "200px",background:'none' }}
        
      >
        {selectedValue && typeof selectedValue === "object"
          ? selectedValue.label
          : selectedValue || "Select an option"}
          
      </button>

      {isOpen && (
        <ul
          className={ishome ? "home-ul" : ""}
          style={{
            listStyleType: "none",
            padding: 0,
            border: "1px solid #ccc",
            marginTop: 5,
          }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleChange(option)}
              style={{ padding: "10px", cursor: "pointer" }}
            >
          
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.label}
                      style={{ marginRight: 8, height: 30, width: 40 }}
                    />
                  )}
                        {option.label}
                 
                 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropDown;
