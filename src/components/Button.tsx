import React from "react";
import styled from "styled-components";

interface ButtonProps {
    text: string;
    blue?: boolean;
    onClick: (index: number) => void;
    index: number;
}

const Button: React.FC<ButtonProps> = ({ text, blue = false, onClick, index }) => {
    return (
        <Div>
            <button key={index} onClick={() => onClick(index)} className={`${blue ? "blue" : ""}`}>{text}</button>
        </Div>
    );
}
export default Button;
const Div = styled.div`
  button {
    border-radius: 4rem;
    padding: 0.8rem 2rem;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    :not(.blue) {
      background-color: transparent;
      border: 1px solid white;
    }
  }
  .blue {
    background-color: #2d69fd;
  }
`;