import React from 'react';

const CustomLabel = ({ label, fontSize, color = '#000000', letterSpacing = 'normal', fontWeight = 'normal' }) => {
	return (
		<label style={{ fontSize: fontSize, color: color, letterSpacing: letterSpacing, fontWeight: fontWeight }}>
			{label}
		</label>
	);
};

export default CustomLabel;
