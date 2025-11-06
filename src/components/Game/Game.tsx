import type { GameItem } from '@models/game';

import { clsx } from 'clsx';
import { useState } from 'react';
import { usePriceStore } from '@store';
import { GamePrices } from '@components';
import { GameToolbar } from './components';
import '@styles/game.css';

import playIcon from '@images/play-icon.png';
import wishIcon from '@images/wish-icon.png';
import overlay from '@images/overlay.png';
// import question from '@images/question.png';

type GameProps = {
	game: GameItem;
};

export const Game = ({
	game
}: GameProps) => {
	const { priceCategory } = usePriceStore(state => state.getPrice(game));

	const [hovered, setHovered] = useState(false);
	const opacity = hovered ? 1 : 0;

	const showToolbar = () => setHovered(true);
	const hideToolbar = () => setHovered(false);

	return (
		<li
			id={game.slug}
			tabIndex={0}
			onMouseEnter={showToolbar}
			onMouseLeave={hideToolbar}
			onFocus={showToolbar}
			onBlur={hideToolbar}
			className={clsx('game', {
				['--wish']: game.wish,
				['--play']: game.play,
				[`game--${priceCategory}`]: priceCategory
			})}
		>
			<div className="game__title-container" style={{ opacity }}>
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

			<GameToolbar game={game} opacity={opacity} />

			<GamePrices game={game} />
		</li>
	);
};
