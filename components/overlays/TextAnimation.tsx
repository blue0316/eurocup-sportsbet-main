import React, { useState, useEffect } from "react";

const COLORS = [
	"#ff3838",
	"#fff200",
	"#25CCF7",
	"#c56cf0",
	"#ff9f1a",
	"#ffb8b8",
	"#FAFAFA",
];

const Animations = [
	"top-to-bottom-rotateY",
	"top-to-bottom",
	"top-to-bottom-rotateX",
	"top-to-bottom-rotate",
	"animation-5",
	"animation-6",
];

export const TextAnimation = () => {
	const [text, setText] = useState("GOAALLLL!!");
	const [animationName, setAnimationName] = useState(Animations[5]);
	const [isAnimationStopped, setIsAnimationStopped] = useState(false);

	useEffect(() => {
		init();
	}, [text, animationName]);

	const createElement = (elementName: any, className: string) => {
		const element = document.createElement(elementName);
		element.className = className;
		return element;
	};

	const createLetters = (parentNode: any, char: any, diff: any) => {
		const LEN_OF_ELEMENT = 8;
		for (let i = 0; i < LEN_OF_ELEMENT; i++) {
			const delay = (LEN_OF_ELEMENT - i + 1) / 10 + diff;
			const element = createElement("span", `letter ${animationName}`);
			element.textContent = char;
			element.style = `--delay:${delay}s; color:${COLORS[i]};`;
			parentNode.append(element);
		}
	};

	const init = () => {
		const root: any = document.querySelector(".wrapper");
		let arr = [];
		let diff = 0.0;

		for (let char of text) {
			const wrapper = createElement("div", "letter-wrapper text-lg md:text-xl");
			createLetters(wrapper, char, diff);
			diff += 0.12;
			arr.push(wrapper);
		}
		root.innerHTML = "";
		root.append(...arr);
	};

	return (
		<div
			className={`wrapper  -rotate-12 left-[15%] md:!top-[45%] md:!left-[35%] font-bold ${
				isAnimationStopped ? "animation-stop" : ""
			}`}
		></div>
	);
};
