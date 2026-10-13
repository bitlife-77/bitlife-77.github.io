// Source: https://unblocked-games-g-plus.bitbucket.io/
// Game iframe: https://splenedu52.github.io/g50/class-{id}/
// Thumbnail: https://unblocked-games-g-plus.bitbucket.io/images/games/class-{id}.webp

export function getGameUrl(game) {
  return game.gameUrl || '';
}

export function getThumbUrl(game) {
  const img = game.thumb || game.icon;
  if (img) {
    return img.startsWith('/') ? img : `/${img}`;
  }
  return `/img/${game.id}.webp`;
}

// Category icon map
export const CAT_ICONS = {
  Popular:     '🔥',
  New:         '🆕',
  Action:      '⚔️',
  Running:     '🏃',
  '3D':        '🎲',
  Shooting:    '🎯',
  Multiplayer: '👥',
  Racing:      '🏁',
  Moto:        '🏍️',
  Stickman:    '🥊',
  Adventure:   '🗺️',
  Puzzle:      '🧩',
  Animal:      '🐾',
  Platform:    '🕹️',
  Simulation:  '🖥️',
  Management:  '🏗️',
  Survival:    '🌿',
  Strategy:    '♟️',
  Board:       '♜',
  Girls:       '💖',
  '2 Player':  '🤝',
  Car:         '🏎️',
  Sports:      '⚽',
  Skill:       '🧠',
};

export const CATEGORIES = [
  { id: 'all',         emoji: '🎮', label: '🎮 All Games',     shortLabel: 'All Games' },
  { id: 'Popular',     emoji: '🔥', label: '🔥 Popular',       shortLabel: 'Popular' },
  { id: 'Action',      emoji: '⚔️', label: '⚔️ Action',        shortLabel: 'Action' },
  { id: 'New',         emoji: '🆕', label: '🆕 New',           shortLabel: 'New' },
  { id: 'Skill',       emoji: '🧠', label: '🧠 Skill',         shortLabel: 'Skill' },
  { id: 'Running',     emoji: '🏃', label: '🏃 Running',       shortLabel: 'Running' },
  { id: 'Adventure',   emoji: '🗺️', label: '🗺️ Adventure',     shortLabel: 'Adventure' },
  { id: 'Platform',    emoji: '🕹️', label: '🕹️ Platform',      shortLabel: 'Platform' },
  { id: 'Car',         emoji: '🏎️', label: '🏎️ Car',           shortLabel: 'Car' },
  { id: 'Racing',      emoji: '🏁', label: '🏁 Racing',        shortLabel: 'Racing' },
  { id: 'Moto',        emoji: '🏍️', label: '🏍️ Moto',          shortLabel: 'Moto' },
  { id: '3D',          emoji: '🎲', label: '🎲 3D',            shortLabel: '3D' },
  { id: 'Shooting',    emoji: '🎯', label: '🎯 Shooting',      shortLabel: 'Shooting' },
  { id: 'Multiplayer', emoji: '👥', label: '👥 Multiplayer',   shortLabel: 'Multiplayer' },
  { id: '2 Player',    emoji: '🤝', label: '🤝 2 Player',      shortLabel: '2 Player' },
  { id: 'Sports',      emoji: '⚽', label: '⚽ Sports',        shortLabel: 'Sports' },
  { id: 'Puzzle',      emoji: '🧩', label: '🧩 Puzzle',        shortLabel: 'Puzzle' },
  { id: 'Animal',      emoji: '🐾', label: '🐾 Animal',        shortLabel: 'Animal' },
  { id: 'Stickman',    emoji: '🥊', label: '🥊 Stickman',      shortLabel: 'Stickman' },
  { id: 'Simulation',  emoji: '🖥️', label: '🖥️ Simulation',    shortLabel: 'Simulation' },
  { id: 'Management',  emoji: '🏗️', label: '🏗️ Management',    shortLabel: 'Management' },
  { id: 'Survival',    emoji: '🌿', label: '🌿 Survival',      shortLabel: 'Survival' },
  { id: 'Strategy',    emoji: '♟️', label: '♟️ Strategy',       shortLabel: 'Strategy' },
  { id: 'Board',       emoji: '♜',  label: '♜ Board',          shortLabel: 'Board' },
  { id: 'Girls',       emoji: '💖', label: '💖 Girls',         shortLabel: 'Girls' },
];
