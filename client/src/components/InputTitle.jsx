import React from "react";

function InputTitle(props) {
    return (
        <div className="max-w-full my-7 mx-7">
            <label className="text-xl text-black" htmlFor={props.name}>{props.text}</label><br />
            <textarea
                onChange={props.changeFunction}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                rows={props.rows || 1} 
                cols={props.cols || 180} 
                autoComplete="off"
                required
                className="w-full rounded-3xl px-5 py-3 text-xl mt-1.5 bg-[#2d2d2d] text-[#ffffffde]"
            />
            <br />
        </div>
    );
}

export default InputTitle;
