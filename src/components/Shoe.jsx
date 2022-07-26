import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import { autoCursor, customCursor } from '../utils';
import { angleToRadians } from '../utils';

const Shoe = ({ ...props }) => {
	const gltfPath = '../../public/models/custom-shoe/shoe.gltf';
	const group = useRef();
	const snap = useSnapshot(props.state);
	const { nodes, materials } = useGLTF(gltfPath);
	const [hovered, setHovered] = useState(null);

	useEffect(() => {
		const cursor = customCursor(snap.items[hovered], hovered);
		const auto = autoCursor();
		document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
			hovered ? cursor : auto
		)}'), auto`;
	}, [hovered]);

	return (
		<group
			ref={group}
			{...props}
			dispose={null}
			scale={1.5}
			rotation={[0, 0, angleToRadians(-30)]}
			position={[0, 1, 0]}
			onPointerOver={(e) => {
				e.stopPropagation(), setHovered(e.object.material.name);
			}}
			onPointerOut={(e) => {
				e.intersections.length === 0 && setHovered(null);
			}}
			onPointerDown={(e) => {
				e.stopPropagation();
				props.state.current = e.object.material.name;
			}}
			onPointerMissed={(e) => {
				props.state.current = null;
			}}
		>
			<mesh
				material-color={snap.items.laces}
				geometry={nodes.shoe.geometry}
				material={materials.laces}
			/>
			<mesh
				material-color={snap.items.mesh}
				geometry={nodes.shoe_1.geometry}
				material={materials.mesh}
			/>
			<mesh
				material-color={snap.items.caps}
				geometry={nodes.shoe_2.geometry}
				material={materials.caps}
			/>
			<mesh
				material-color={snap.items.inner}
				geometry={nodes.shoe_3.geometry}
				material={materials.inner}
			/>
			<mesh
				material-color={snap.items.sole}
				geometry={nodes.shoe_4.geometry}
				material={materials.sole}
			/>
			<mesh
				material-color={snap.items.stripes}
				geometry={nodes.shoe_5.geometry}
				material={materials.stripes}
			/>
			<mesh
				material-color={snap.items.band}
				geometry={nodes.shoe_6.geometry}
				material={materials.band}
			/>
			<mesh
				material-color={snap.items.patch}
				geometry={nodes.shoe_7.geometry}
				material={materials.patch}
			/>
		</group>
	);
};
export default Shoe;
