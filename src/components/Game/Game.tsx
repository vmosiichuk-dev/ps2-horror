import type { GameItem } from '@utils/game';
import { clsx } from 'clsx';
import { GamePrice } from '@components';
import controller from '@images/controller.png';
import star from '@images/star.png';
import info from '@images/info.png';
// import question from '@images/question.png';
import overlay from '@images/overlay.png';
import del from '@images/del.png';
import '@styles/game.css';

interface GameProps {
	game: GameItem
}

export const Game = ({
	game
}: GameProps) => {
	const { slug, title, src, wish, play, priceCategory } = game;
	const focusStyle = { opacity: 0 };

	return (
		<li
			id={slug}
			className={clsx('game', {
				['--wish']: wish,
				['--play']: play,
				[`game--${priceCategory}`]: priceCategory
			})}
		>
			<div className="game__title-container" style={focusStyle}>
				<h2 className="game__title">{title}</h2>
			</div>

			<img className="game__cover-img" src={src} alt={"PS2 game cover for " + title} />
			<img className="game__cover-overlay" src={overlay} alt="" />

			<div className="game__status-container">
				<img className="game__status --wish" src={star} alt="" />
				<img className="game__status --play" src={controller} alt="" />
			</div>

			<div
				className="game-buttons"
				tabIndex={0}
				role="toolbar"
				aria-activedescendant={slug + "--toolbar-wish"}
				aria-label={"Control options for " + title + ":"}
				style={focusStyle}
			>
				<button
					type="button"
					id={slug + "--toolbar-wish"}
					className="btn-sm btn-wish"
					data-toggle="wish"
				>
					<img
						className="icon icon-wish"
						src={star}
						alt={wish ? "Remove from wishlist" : "Add to wishlist"}
					/>
				</button>

				<button
					type="button"
					id={slug + "--toolbar-play"}
					className="btn-sm btn-play"
					data-toggle="play"
				>
					<img
						className="icon icon-played"
						src={controller}
						alt={play ? "Remove from played" : "Mark as played"}
					/>
				</button>

				<button
					type="button"
					id={slug + "--toolbar-info"}
					className="btn-sm btn-info"
				>
					<img
						className="icon icon-info"
						src={info}
						alt="Load game data"
					/>
				</button>

				<button
					type="button"
					id={slug + "--toolbar-delete"}
					className="btn-sm btn-delete"
				>
					<img
						className="icon icon-delete"
						src={del}
						alt="Delete game"
					/>
				</button>

				<p className="delete-p">
					Are you sure?<br/>Click again to delete.
				</p>
			</div>

			<GamePrice />
		</li>
	);
};
