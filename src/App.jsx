import './App.css';
import React, { Suspense } from 'react';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { proxy } from 'valtio';
import Picker from './components/Picker';
import Shoe from './components/Shoe';

const state = proxy({
	current: null,
	items: {
		laces: '#ff0b0b',
		mesh: '#ffffff',
		caps: '#ffffff',
		inner: '#ffffff',
		sole: '#ffffff',
		stripes: '#ffffff',
		band: '#ffffff',
		patch: '#ffffff',
	},
});

export default function App() {
	return (
		<div className='wrapper'>
			<h1>FIT✓</h1>
			<Picker state={state} />

			<Canvas>
				<OrbitControls enablePan={false} />
				<ambientLight />
				<spotLight intensity={0.3} position={[5, 20, 20]} />
				<spotLight distance={5} angle={0.15} attenuation={5} anglePower={5} />
				<Suspense fallback={null}>
					<Shoe state={state} />
					<Environment files={'hdr.hdr'} />
					{/* <Environment files={'hdr.hdr'} background /> */}
					<ContactShadows
						rotation-x={Math.PI / 2}
						position={[0, -0.9, 0]}
						opacity={0.6}
						width={3}
						height={3}
						blur={2}
						far={10}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}
