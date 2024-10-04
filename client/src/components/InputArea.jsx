import React from "react";

function InputArea(props) {
    return (
        <div className="max-w-full my-7 mx-7">
            <label className="text-2xl text-[#ffffffde]" htmlFor={props.name}>{props.text}</label><br />
            <textarea
                onChange={props.changeFunction}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                rows={props.rows || 6} 
                cols={props.cols || 180} 
                autoComplete="off"
                required
                className="w-full rounded-3xl px-5 py-3 text-xl mt-1.5 bg-[#2d2d2d] text-[#ffffffde]"
            />
            <br />
        </div>
    );
}

export default InputArea;
