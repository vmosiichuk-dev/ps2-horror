import type { GameItem } from '@modules/game';

import { clsx } from 'clsx';
import { Game } from '@components';
import '@styles/game-list.css';

interface GameListProps {
	data: GameItem[]
}

export const GameList = ({ data }: GameListProps) => {
	return (
		<ul
			className={clsx('game-list', {
				'game-list--8': data.length <= 8,
				'game-list--10': data.length > 8 && data.length <= 10,
				'game-list--12': data.length > 10 && data.length <= 12,
				'game-list--24': data.length > 12 && data.length <= 24,
			})}
		>
			{data.map((game: any) => (
				<Game key={game.id} game={game} />
			))}
		</ul>
	);
};
