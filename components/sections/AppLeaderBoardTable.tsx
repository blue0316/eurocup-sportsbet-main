export const AppLeaderBoardTable = () => {
	return (
		<div className="max-w-[800px] mx-auto mt-12">
			<div className="items-center py-4 justify-between hidden md:flex">
				<div className="w-[15%] pl-6"></div>
				<div className="w-[50%]"></div>
				<div className="w-[20%]">
					<span className="font-semibold text-white text-xl">
						Winnings
					</span>
				</div>
			</div>
			<div className="flex flex-wrap items-center px-4 md:px-0 py-4 justify-between bg-[#2c4fde] rounded mb-8 las:mb-0 transform hover:scale-105 transition-transform duration-30 w-11/12 mx-auto md:w-full">
				<div className="w-[15%] relative">
					<div className="md:absolute bg-[#153BDA] top-[-48px] left-[-20px] h-[50px] w-[50px] md:h-[100px] md:w-[100px] rounded-full border-4 border-white top-0 bottom-0 flex items-center justify-center text-white text-3xl font-bold">
						1
					</div>
				</div>
				<div className="w-full md:w-[50%] md:pl-6 flex flex-col my-4 md:my-0 md:flex-row md:items-center">
					<img
						className="w-[50px] mr-2"
						src="/images/user-image.png"
						alt="Upload user image"
					/>
					<span className="text-white text-base mt-2 md:mt-0">
						Eurobet69
					</span>
				</div>
				<div className="w-full md:w-[20%] flex flex-col mb-4 md:mb-0">
					<span className="text-white text-xl font-bold md:hidden">
						Winnings
					</span>
					<p className="text-white text-base w-max">
						344,553
						<span className="text-sm ml-1">$ECI</span>
						<span className="text-right block text-sm">($194)</span>
					</p>
				</div>
			</div>
			<div className="flex flex-wrap items-center px-4 md:px-0 py-4 justify-between bg-[#2c4fde] rounded mb-8 las:mb-0 transform hover:scale-105 transition-transform duration-30 w-11/12 mx-auto md:w-full">
				<div className="w-[15%] relative">
					<div className="md:absolute bg-[#153BDA] top-[-48px] left-[-20px] h-[50px] w-[50px] md:h-[100px] md:w-[100px] rounded-full border-4 border-white top-0 bottom-0 flex items-center justify-center text-white text-3xl font-bold">
						2
					</div>
				</div>
				<div className="w-full md:w-[50%] md:pl-6 flex flex-col my-4 md:my-0 md:flex-row md:items-center">
					<img
						className="w-[50px] mr-2"
						src="/images/user-image.png"
						alt="Upload user image"
					/>
					<span className="text-white text-base mt-2 md:mt-0">
						Ethisking
					</span>
				</div>
				<div className="w-full md:w-[20%] flex flex-col mb-4 md:mb-0">
					<span className="text-white text-xl font-bold md:hidden">
						Winnings
					</span>
					<p className="text-white text-base w-max">
						234,223
						<span className="text-sm ml-1">$ECI</span>
						<span className="text-right block text-sm">($94)</span>
					</p>
				</div>
			</div>
			<div className="flex flex-wrap items-center px-4 md:px-0 py-4 justify-between bg-[#2c4fde] rounded mb-8 las:mb-0 transform hover:scale-105 transition-transform duration-30 w-11/12 mx-auto md:w-full">
				<div className="w-[15%] relative">
					<div className="md:absolute bg-[#153BDA] top-[-48px] left-[-20px] h-[50px] w-[50px] md:h-[100px] md:w-[100px] rounded-full border-4 border-white top-0 bottom-0 flex items-center justify-center text-white text-3xl font-bold">
						3
					</div>
				</div>
				<div className="w-full md:w-[50%] md:pl-6 flex flex-col my-4 md:my-0 md:flex-row md:items-center">
					<img
						className="w-[50px] mr-2"
						src="/images/user-image.png"
						alt="Upload user image"
					/>
					<span className="text-white text-base mt-2 md:mt-0">
						cr7fan
					</span>
				</div>
				<div className="w-full md:w-[20%] flex flex-col mb-4 md:mb-0">
					<span className="text-white text-xl font-bold md:hidden">
						Winnings
					</span>
					<p className="text-white text-base w-max">
						144,553
						<span className="text-sm ml-1">$ECI</span>
						<span className="text-right block text-sm">($44)</span>
					</p>
				</div>
			</div>
		</div>
	);
};
