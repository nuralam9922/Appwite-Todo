import React from 'react';

function FallBackUi({transparent}) {
	return (
		<div className={`flex justify-center items-center h-screen poppins-regular bg-[${transparent ? 'transparent' : 'white'}]`}>
			<div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
		</div>
	);
}

export default FallBackUi;
