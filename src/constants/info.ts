import { acbm, acbrc, acbma15 } from '@images/ratings/acb';
import { cerob, ceroc, cerod, ceroz } from '@images/ratings/cero';
import { classind16, classind18 } from '@images/ratings/classind';
import { esrbm, esrbt } from '@images/ratings/esrb';
import { grac15, grac19 } from '@images/ratings/grac';
import { pegi7, pegi12, pegi16, pegi18 } from '@images/ratings/pegi';
import { usk12, usk16, usk18 } from '@images/ratings/usk';

import * as src from '@images/screenshots';

export const AGE_RATING_PRIORITY: Record<string, number> = {
	acb: 2,
	cero: 5,
	classind: 1,
	esrb: 7,
	grac: 3,
	pegi: 6,
	usk: 4,
	fallback: 0,
};

export const AGE_RATING_MAP: Record<string, string> = {
	'acbm': acbm,
	'acbma15': acbma15,
	'acbrc': acbrc,
	'cerob': cerob,
	'ceroc': ceroc,
	'cerod': cerod,
	'ceroz': ceroz,
	'classind16': classind16,
	'classind18': classind18,
	'esrbm': esrbm,
	'esrbt': esrbt,
	'grac15': grac15,
	'grac19': grac19,
	'pegi7': pegi7,
	'pegi12': pegi12,
	'pegi16': pegi16,
	'pegi18': pegi18,
	'usk12': usk12,
	'usk16': usk16,
	'usk18': usk18,
};

import type { InfoItem } from '@modules/info';

export const INFO = {
	'5720': {
		title: 'Aliens Versus Predator: Extinction',
		screenshot: src.aliens
	},
	'300074': {
		title: 'Alone in the Dark',
	},
	'266501': {
		title: 'Alone in the Dark: The New Nightmare',
		screenshotIndex: 4,
	},
	'5729': {
		title: 'Area 51',
		screenshotIndex: 4,
	},
	'4705': {
		title: 'Baroque',
		screenshot: src.baroque
	},
	'78212': {
		title: 'Berserk Millennium Empire Arc: Chapter of the Holy Demon War',
		screenshot: src.berserk
	},
	'3823': {
		title: 'Blood Omen 2: Legacy of Kain',
		screenshotIndex: 4,
	},
	'1015': {
		title: 'BloodRayne',
		screenshotIndex: 2,
		summary: 'BloodRayne is an action-adventure hack and slash video game. The game has spawned a franchise with the addition of sequels, films, and self-contained comic books. The game begins in 1933, and consists of three acts. The plot revolves around Rayne – a dhampir looking for her father. She is working for the Brimstone Society and kills any vampire that crosses her path.'
	},
	'1016': {
		title: 'BloodRayne 2',
		screenshotIndex: 3,
	},
	'1137': {
		title: 'Castlevania: Curse of Darkness',
		screenshotIndex: 2,
	},
	'18305': {
		title: 'Clock Tower 3',
		screenshotIndex: 2,
	},
	'5780': {
		title: 'Cold Fear',
		summary: 'Cold Fear is a first survival horror published by Ubisoft and developed by Darkworks – creators of Alone in the Dark: The New Nightmare. The game tells the story of Tom Hansen, a member of the United States Coast Guard, who comes to the aid of a Russian whaler and finds a mysterious virus has broken out and turned the crew into zombie like creatures.'
	},
	'5787': {
		title: 'Constantine',
		screenshotIndex: 1,
	},
	'5796': {
		title: 'Curse: The Eye of Isis',
		screenshotIndex: 1,
	},
	'44628': {
		title: 'Daemon Summoner',
		screenshot: src.daemon
	},
	'5808': {
		title: 'Darkwatch',
		screenshotIndex: 3,
	},
	'135': {
		title: 'Devil May Cry 2',
		screenshotIndex: 2,
	},
	'20545': {
		title: `Devil May Cry 3: Dante's Awakening - Special Edition`,
		screenshotIndex: 4,
	},
	'22065': {
		title: 'Dino Stalker',
	},
	'11695': {
		title: 'Disaster Report',
	},
	'11635': {
		title: 'Drakengard',
		screenshotIndex: 2,
	},
	'9515': {
		title: 'Echo Night: Beyond',
	},
	'5827': {
		title: 'Evil Dead: A Fistful of Boomstick',
		screenshotIndex: 2,
	},
	'5828': {
		title: 'Evil Dead: Regeneration',
		screenshot: src.evildeadr
	},
	'18332': {
		title: `Evil Twin: Cyprien's Chronicles`,
		screenshotIndex: 1,
		summary: `The game was originally intended to be released in late 1999 under the title of 'Evil Twin' but was later delayed due to financial reasons. The player takes control of a young orphan named Cyprien, who ventures through a nightmarish world and can transform into a superhero version of himself named Supercyp during his journey to Loren Darith to free his teddy bear, Lenny.`,
		ageRatings: [
			{
				ratingLabel: 'pegi12',
				ratingCoverUrl: pegi12,
			}
		]
	},
	'10914': {
		title: 'Extermination',
		screenshot: src.extermination,
		summary: `Coming out early in the system's life cycle, the title was used as a showcase at trade shows before its release. It is considered the first survival horror game on the PS2. The game generated hype amongst critics, but received mostly average reviews. There are significant differences between PAL and NTSC U/C versions including a redesign of the main protagonist and entirely rerecorded dialogue.`
	},
	'5106': {
		title: 'Fatal Frame',
		screenshotIndex: 1,
	},
	'5105': {
		title: 'Fatal Frame II: Crimson Butterfly',
	},
	'5107': {
		title: 'Fatal Frame III: The Tormented',
	},
	'14411': {
		title: 'Forbidden Siren 2',
		ageRatings: [
			{
				ratingLabel: 'pegi16',
				ratingCoverUrl: pegi16,
			},
			{
				ratingLabel: 'ceroc',
				ratingCoverUrl: ceroc,
			}
		]
	},
	'19629': {
		title: 'Galerians: Ash',
		screenshot: src.galerians
	},
	'78046': {
		title: 'Gantz: The Game',
		screenshot: src.gantz,
		summary: `Gantz: The Game is an immersive adaptation of the popular manga and anime series. Fight surreal and deadly battle against menacing alien creatures, strategize and adapt to survive increasingly challenging encounters and unlock the mysteries surrounding character's predicament. The game boasts stunning visuals that capture the essence of the source material.`,
		companyLabel: 'Developer',
		companyName: 'KCEJ East',
		ageRatings: [
			{
				ratingLabel: 'cerod',
				ratingCoverUrl: cerod,
			}
		]
	},
	'22279': {
		title: 'Ghosthunter',
		screenshot: src.ghosthunter
	},
	'43420': {
		title: 'Ghost Vibration',
		screenshot: src.ghostvibration,
		companyLabel: 'Developer',
		companyName: 'Artoon Co., Ltd.',
		genres: ['Action'],
		ageRatings: [
			{
				ratingLabel: 'pegi12',
				ratingCoverUrl: pegi12,
			}
		]
	},
	'22252': {
		title: 'Gregory Horror Show',
	},
	'14605': {
		title: 'Haunting Ground',
		screenshotIndex: 1,
	},
	'43433': {
		title: 'Hungry Ghosts',
		screenshot: src.hungryghosts,
		summary: `Developed by Japanese software house Deep Space (previously responsible for the survival horror game Extermination) and designed by their founder Tokuro Fujiwara (previously responsible for, of all things, the seminal Ghosts 'n Goblins). Hungry Ghosts is a first-person horror action experience with some very deep character 'creation'. In fact, it is an immersive simulation.`,
		ageRatings: [
			{
				ratingLabel: 'ceroc',
				ratingCoverUrl: ceroc,
			}
		]
	},
	'2632': {
		title: 'Jaws Unleashed',
		screenshot: src.jaws
	},
	'3966': {
		title: 'Killer7',
	},
	'9501': {
		title: `King's Field IV`,
		screenshot: src.kingsfield,
		summary: `The fourth game in the King's Field series (and third to be released in the west) and the last one released for home consoles. A demonic idol responsible for the destruction of an ancient race has re-emerged and threatens to destroy mankind. Your mission is to take on the role of a warrior who has to return the idol to the Ancient City to break its curse.`
	},
	'336005': {
		title: 'Kyoufu Shinbun Heisei-ban: Kaiki! Shinrei File',
	},
	'10909': {
		title: 'Kuon',
		screenshot: src.kuon
	},
	'5901': {
		title: 'Legacy of Kain: Defiance',
	},
	'7893': {
		title: 'Legacy of Kain: Soul Reaver 2',
		screenshotIndex: 4,
	},
	'83829': {
		title: 'Lifeline',
		screenshot: src.lifeline
	},
	'1971': {
		title: 'Manhunt',
	},
	'1972': {
		title: 'Manhunt 2',
		screenshotIndex: 1,
	},
	'26294': {
		title: 'Michigan: Report from Hell',
		screenshot: src.michigan,
		ageRatings: [
			{
				ratingLabel: 'pegi18',
				ratingCoverUrl: pegi18,
			},
			{
				ratingLabel: 'cerod',
				ratingCoverUrl: cerod,
			}
		]
	},
	'69523': {
		title: 'Mystic Nights',
		screenshotIndex: 2,
		summary: 'A South-Korean exclusive horror with Resident Evil gameplay style. You are called to investigate a secret government facility that was suddenly abandoned. On the way, you discover that it has been overtaken by numerous nightmarish monsters and vampires. In multi-player, you need to escape in a limited time, while one of the players takes the role of a renegade.',
		ageRatings: [
			{
				ratingLabel: 'grac19',
				ratingCoverUrl: grac19,
			}
		]
	},
	'5941': {
		title: 'ObsCure',
	},
	'5080': {
		title: 'ObsCure: The Aftermath',
		screenshotIndex: 4,
	},
	'43612': {
		title: 'Onimusha Essentials',
	},
	'5845': {
		title: 'Onimusha: Warlords',
		screenshotIndex: 1,
	},
	'11757': {
		title: `Onimusha 2: Samurai's Destiny`,
		screenshotIndex: 4,
	},
	'43436': {
		title: 'Phase Paradox',
		genres: ['Adventure'],
		screenshotIndex: 1,
		summary: 'Phase Paradox is an NTSC-J exclusive horror adventure set in the same universe as Philosoma, a PlayStation shoot-em-up. The Gallant, a spacecraft carrier was heavily damaged after the explosion of Planet 220. 20% of the crew is either dead or injured by the impact. Some of the survivors are going crazy. But even worst, unknown creatures begin to roam the ship.'
	},
	'11696': {
		title: 'Raw Danger!',
		screenshotIndex: 3,
	},
	'24369': {
		title: 'Resident Evil Code: Veronica X',
		screenshotIndex: 2,
	},
	'971': {
		title: 'Resident Evil: Dead Aim',
	},
	'972': {
		title: 'Resident Evil Outbreak',
		screenshotIndex: 3,
	},
	'973': {
		title: 'Resident Evil Outbreak File #2',
		screenshotIndex: 3,
	},
	'19886': {
		title: 'Resident Evil Survivor 2 Code: Veronica',
		screenshot: src.survivor2,
		ageRatings: [
			{
				ratingLabel: 'pegi16',
				ratingCoverUrl: pegi16,
			},
			{
				ratingLabel: 'cerod',
				ratingCoverUrl: cerod,
			}
		]
	},
	'145191': {
		title: 'Resident Evil 4',
		screenshotIndex: 2,
		websites: [
			{
				label: 'Twitch',
				url: 'https://www.twitch.tv/directory/category/resident-evil-4-2005'
			},
			{
				label: 'Wikia',
				url: 'https://residentevil.fandom.com/wiki/Resident_Evil_4_(2005)'
			},
			{
				label: 'Wikipedia',
				url: 'https://en.wikipedia.org/wiki/Resident_Evil_4'
			}
		]
	},
	'41861': {
		title: 'Resident Evil 4: Premium Edition',
		screenshot: src.resident4premium,
		websites: [
			{
				label: 'Twitch',
				url: 'https://www.twitch.tv/directory/category/resident-evil-4-2005'
			},
			{
				label: 'Wikia',
				url: 'https://residentevil.fandom.com/wiki/Resident_Evil_4_(2005)'
			},
			{
				label: 'Wikipedia',
				url: 'https://en.wikipedia.org/wiki/Resident_Evil_4'
			}
		],
		ageRatings: [
			{
				ratingLabel: 'esrbm',
				ratingCoverUrl: esrbm,
			},
			{
				ratingLabel: 'pegi18',
				ratingCoverUrl: pegi18,
			},
			{
				ratingLabel: 'ceroz',
				ratingCoverUrl: ceroz,
			}
		]
	},
	'281': {
		title: 'Return to Castle Wolfenstein',
	},
	'7415': {
		title: 'Rule of Rose',
		screenshotIndex: 3,
	},
	'6011': {
		title: 'Run Like Hell: Hunt or Be Hunted',
		screenshot: src.rlh
	},
	'481': {
		title: 'Silent Hill 2',
		screenshotIndex: 4,
	},
	'22066': {
		title: 'Silent Hill 2: Restless Dreams',
		screenshotIndex: 1,
	},
	'43277': {
		title: 'Silent Hill 2: Special 2 Disc Set',
		screenshot: src.silent2special,
		websites: [
			{
				label: 'Moby Games',
				url: 'https://www.mobygames.com/game/138259/silent-hill-2-special-2-disc-set/'
			},
			{
				label: 'Crimson Ceremony',
				url: 'https://www.crimson-ceremony.net/lostreleases/item.php?id=shgame_sh2-ps2-eur1'
			}
		]
	},
	'482': {
		title: 'Silent Hill 3',
		screenshotIndex: 2,
	},
	'483': {
		title: 'Silent Hill 4: The Room',
	},
	'484': {
		title: 'Silent Hill: Origins',
		screenshotIndex: 4,
	},
	'486': {
		title: 'Silent Hill: Shattered Memories',
		screenshotIndex: 2,
	},
	'3599': {
		title: 'Shadow Man: 2econd Coming',
	},
	'9503': {
		title: 'Shadow Tower: Abyss',
		screenshot: src.abyss,
		ageRatings: [
			{
				ratingLabel: 'ceroc',
				ratingCoverUrl: ceroc,
			}
		]
	},
	'166445': {
		title: 'Simple 2000 Series Vol. 113: The Tairyou Jigoku',
		screenshot: src.tairyou,
		summary: `The game follows the story of a schoolgirl chasing down a very Alice In Wonderland-styled rabbit through various worlds, to take back the cellphone he stole from her. While you're running around you come across hoards of massive insects. The enemies never truly die, within a few seconds they are back up again and ready to attack! There are some additional endings and unlockables.`
	},
	'14522': {
		title: 'Siren',
		screenshotIndex: 1,
	},
	'43602': {
		title: 'Splatter Master',
		ageRatings: [
			{
				ratingLabel: 'cerob',
				ratingCoverUrl: cerob,
			}
		]
	},
	'94356': {
		title: 'The Fear',
		screenshot: src.fear,
		summary: `The Fear is an interactive movie featuring live actors. You can move from first-person perspective, each movement being shown as a full-motion video, as well as, solve puzzles and play out action sequences. The story tells about a group of filmmakers shooting a horror film. Guided by the 'Camera Man', they explore a mansion with the troubled past and learn its history.`,
		ageRatings: [
			{
				ratingLabel: 'ceroc',
				ratingCoverUrl: ceroc,
			}
		]
	},
	'3945': {
		title: 'The Haunted Mansion',
		screenshot: src.haunted,
		summary: 'The Haunted Mansion is an action-adventure video game released in 2003 from North America and 2004 in Europe and Japan by High Voltage Software. The game is based on the Disney ride of the same name, rather than the eponymous film, which was released shortly after the game.[2][3][4] However, some elements and set designs from the film are incorporated into the game.'
	},
	'43551': {
		title: 'The Silent Hill Collection',
		screenshot: src.silentcollection,
		genres: ['Puzzle', 'Adventure'],
		websites: [
			{
				label: 'Moby Games',
				url: 'https://www.mobygames.com/game/22234/the-silent-hill-collection/'
			},
			{
				label: 'Crimson Ceremony',
				url: 'https://www.crimson-ceremony.net/lostreleases/item.php?id=shgame_shbox-eur-collection'
			}
		],
		ageRatings: [
			{
				ratingLabel: 'esrbm',
				ratingCoverUrl: esrbm,
			},
			{
				ratingLabel: 'pegi18',
				ratingCoverUrl: pegi18,
			}
		]
	},
	'6180': {
		title: 'The Suffering',
	},
	'6181': {
		title: 'The Suffering: Ties That Bind',
	},
	'6199': {
		title: 'The Thing',
		screenshotIndex: 1,
	},
	'43672': {
		title: 'The X-Files: Resist or Serve',
		screenshotIndex: 3,
	},
	'22576': {
		title: 'Trapt',
		screenshot: src.trapt
	},
	'1329': {
		title: 'Turok: Evolution',
		screenshot: src.turok
	},
	'6226': {
		title: 'Van Helsing',
		screenshot: src.vanhelsing
	},
	'13902': {
		title: 'Vampire Night',
		screenshotIndex: 1,
		summary: 'A light gun game first released for arcades and later ported to PS2 in 2001. The gameplay itself utilizes the engine that is used in The House of the Dead series. A struggle between light and dark, from three centuries back, is about to ensue. The parties involved are Michel and Albert – the two vampire hunters representing light, and the vampires representing dark.'
	},
	'21552': {
		title: 'Zombie Hunters',
		screenshot: src.zombiehunters
	},
	'21553': {
		title: 'Zombie Hunters 2',
		screenshot: src.zombiehunters2
	}
} satisfies Record<string, InfoItem>;
