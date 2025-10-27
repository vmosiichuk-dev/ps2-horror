import type { ActiveFilter } from '@modules/price';
import type { ChangeEvent } from 'react';

import { clsx } from 'clsx';
import { useState } from 'react';
import { usePriceStore } from '@store/usePriceStore';
import { TotalGamePrices } from '@components';
import '@styles/navigation.css';

import playIcon from '@images/play-icon.png';
import wishIcon from '@images/wish-icon.png';
import psLogo from '@images/ps-logo.svg';
import searchIcon from '@images/search.png';
import deleteIcon from '@images/delete-icon.png';
// import menuImg from '@images/plus.svg';

export const Navigation = () => {
	const activeFilter = usePriceStore(state => state.activeFilter);
	const setActiveFilter = usePriceStore(state => state.setActiveFilter);

	const [searchQuery, setSearchQuery] = useState('');
	const [searchIconSrc, setSearchIconSrc] = useState(searchIcon);

	const [logoRotated, setLogoRotated] = useState(false);

	const rotateLogo = () => setLogoRotated((logoRotated) => !logoRotated);

	const onSearchUpdate = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const onSearchFocus = () => setSearchIconSrc(deleteIcon);

	const onSearchBlur = () => {
		if (searchQuery.trim().length === 0) setSearchIconSrc(searchIcon);
	};

	const onDeleteClick = () => {
		if (searchIconSrc === deleteIcon) {
			setSearchQuery('');
			setSearchIconSrc(searchIcon);
		}
	};

	const handleFilterClick = (filter: ActiveFilter) => setActiveFilter(filter);

	return (
		<nav className="nav nav--sticky">
			<div className="nav__title-wrapper">
				<img
					className={clsx('nav__logo', { 'has-rotated': logoRotated })}
					src={psLogo}
					width="30"
					alt="PlayStation Logo"
					onClick={rotateLogo}
				/>

				<h1 className="nav__title">
					<span className="a11y">PS2 Collection App — </span>
					Survival Horror Classics
				</h1>
			</div>

			<section
				className="nav__filters"
				role="toolbar"
				aria-label="Filter controls"
			>
				<button
					type="button"
					className={clsx('btn nav__filter-btn', { 'is-active': activeFilter === 'all' })}
					onClick={() => handleFilterClick('all')}
				>
					All
				</button>

				<button
					type="button"
					className={clsx('btn nav__filter-btn', { 'is-active': activeFilter === 'play' })}
					onClick={() => handleFilterClick('play')}
				>
					<img className="nav__filter-icon" src={playIcon} alt="" /> Played
				</button>

				<button
					type="button"
					className={clsx('btn nav__filter-btn', { 'is-active': activeFilter === 'wish' })}
					onClick={() => handleFilterClick('wish')}
				>
					<img className="nav__filter-icon" src={wishIcon} alt="" /> Wishlist
				</button>

				<button
					type="button"
					className={clsx('btn nav__filter-btn', { 'is-active': activeFilter === 'coll' })}
					onClick={() => handleFilterClick('coll')}
				>
					Collection
				</button>
			</section>

			<section className="nav__search" aria-label="Search input">
				<label htmlFor="nav__search-input" className="a11y">Search</label>

				<input
					type="text"
					value={searchQuery}
					id="nav__search-input"
					className="nav__search-input"
					placeholder="Enter game title"
					onChange={onSearchUpdate}
					onFocus={onSearchFocus}
					onBlur={onSearchBlur}
				/>

				<button
					type="button"
					className="nav__search-btn"
					onClick={onDeleteClick}
				>
					<span className="nav__search-label">
						{searchIconSrc === deleteIcon ? 'Clear' : 'Search'}
					</span>

					<img className="nav__search-icon" alt="" src={searchIconSrc} />
				</button>
			</section>

			{(activeFilter === 'coll' || activeFilter === 'wish') && (
				<section className="nav__progress nav__progress--value">
					<TotalGamePrices />
				</section>
			)}
		</nav>
	);
};
