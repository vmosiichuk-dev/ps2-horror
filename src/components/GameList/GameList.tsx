import del from '@images/del.png';
import '@styles/game-list.css';

interface GameListProps {
	data: any,
}

export const GameList = ({
	data,
}: GameListProps) => {
	console.log({
		data,
		del,
	});

	return (
		<>GameList</>
	);
};
