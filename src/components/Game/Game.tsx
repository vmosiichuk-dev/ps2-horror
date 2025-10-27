import type { GameItem } from '@modules/game';

import { clsx } from 'clsx';
import { useInfoStore } from '@store/useInfoStore';
import { usePriceStore } from '@store/usePriceStore';
import { GamePrices } from '@components';
import '@styles/game.css';

import playIcon from '@images/play-icon.png';
import wishIcon from '@images/wish-icon.png';
import infoIcon from '@images/info-icon.png';
import deleteIcon from '@images/delete-icon.png';
import overlay from '@images/overlay.png';
// import question from '@images/question.png';

interface GameProps {
	game: GameItem
}

export const Game = ({
	game
}: GameProps) => {
	const getPrice = usePriceStore(state => state.getPrice);
	const setActiveGame = useInfoStore(state => state.setActiveGame);

	const { priceCategory } = getPrice(game);
	const focusStyle = { opacity: 0 };

	return (
		<li
			id={game.slug}
			className={clsx('game', {
				['--wish']: game.wish,
				['--play']: game.play,
				[`game--${priceCategory}`]: priceCategory
			})}
		>
			<div className="game__title-container" style={focusStyle}>
				<h2 className="game__title">{game.title}</h2>
			</div>

			<img
				className="game__cover-img"
				src={game.cover}
				alt={'PS2 game cover for ' + game.title}
			/>

			<img className="game__cover-overlay" src={overlay} alt="" />

			<div className="game__status-container">
				<img className="game__status --wish" src={wishIcon} alt="" />
				<img className="game__status --play" src={playIcon} alt="" />
			</div>

			<div
				className="game-buttons"
				tabIndex={0}
				role="toolbar"
				aria-activedescendant={game.slug + '--toolbar-wish'}
				aria-label={"Control options for " + game.title + ":"}
				style={focusStyle}
			>
				<button
					type="button"
					id={game.slug + '--toolbar-wish'}
					className="btn-sm btn-wish"
					data-toggle="wish"
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
					onClick={() => setActiveGame(game)}
				>
					<img
						className="icon icon-info"
						src={infoIcon}
						alt="Load game data"
					/>
				</button>

				<button
					type="button"
					id={game.slug + '--toolbar-delete'}
					className="btn-sm btn-delete"
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

			<GamePrices game={game} />
		</li>
	);
};
