import type { GameItem } from '@models/game';

import { useGameStore, useInfoStore, usePriceStore } from '@store';
import '@styles/game.css';

import playIcon from '@images/play-icon.png';
import wishIcon from '@images/wish-icon.png';
import addIcon from '@images/add-icon.png';
import deleteIcon from '@images/delete-icon.png';
// import infoIcon from '@images/info-icon.png';
// import question from '@images/question.png';

type GameToolbarProps = {
	game: GameItem;
	opacity: 0 | 1;
};

export const GameToolbar = ({
	game,
	opacity,
}: GameToolbarProps) => {
	const setActiveGame = useInfoStore(state => state.setActiveGame);
	const updateGame = useGameStore(state => state.updateGame);
	const activeFilter = usePriceStore(state => state.activeFilter);

	const handleToggle = (field: 'play' | 'wish') => {
		updateGame(game.id, { [field]: !game[field] });
	};

	return (
		<div
			className="game-toolbar"
			tabIndex={0}
			role="toolbar"
			aria-activedescendant={game.slug + '--toolbar-wish'}
			aria-label={"Control options for " + game.title + ":"}
			style={{ opacity }}
			onClick={() => setActiveGame(game)}
		>
			<button
				type="button"
				id={game.slug + '--toolbar-wish'}
				className="btn-sm btn-wish"
				data-toggle="wish"
				onClick={() => handleToggle('wish')}
			>
				<img
					className="icon icon-wish"
					src={wishIcon}
					alt={game.wish ? 'Remove from wishlist' : 'Add to wishlist'}
				/>
			</button>

			<button
				type="button"
				id={game.slug + '--toolbar-play'}
				className="btn-sm btn-play"
				data-toggle="play"
				onClick={() => handleToggle('play')}
			>
				<img
					className="icon icon-played"
					src={playIcon}
					alt={game.play ? 'Remove from played' : 'Mark as played'}
				/>
			</button>

			<button
				type="button"
				id={game.slug + '--toolbar-info'}
				className="btn-sm btn-info"
				disabled={activeFilter === 'all'}
			>
				<img
					className="icon icon-info"
					src={addIcon}
					alt="Load game data"
				/>
			</button>

			<button
				type="button"
				id={game.slug + '--toolbar-delete'}
				className="btn-sm btn-delete"
				disabled={activeFilter !== 'all'}
			>
				<img
					className="icon icon-delete"
					src={deleteIcon}
					alt="Delete game"
				/>
			</button>

			<p className="delete-p">
				Are you sure?<br/>Click again to delete.
			</p>
		</div>
	);
};
