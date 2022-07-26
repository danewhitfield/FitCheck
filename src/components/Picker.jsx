import { HexColorPicker } from 'react-colorful';
import { useSnapshot } from 'valtio';

const Picker = ({ state }) => {
	const snap = useSnapshot(state);
	return (
		<div
			className='picker'
			style={{
				display: snap.current ? 'flex' : 'none',
				width: '400px',
				gap: '20px',
				justifyContent: 'center',
				alignItems: 'space-around',
				transform: 'translateY(-250px)',
				position: 'absolute',
				zIndex: 10,
			}}
		>
			<HexColorPicker
				style={{ width: '130px', height: '100px' }}
				color={snap.items.current}
				onChange={(color) => (state.items[snap.current] = color)}
			/>
			<h1 style={{ userSelect: 'none', width: '100%' }}>{snap.current}</h1>
		</div>
	);
};
export default Picker;
