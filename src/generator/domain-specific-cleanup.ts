/**
 * Domain-specific text cleanup for Air Nomad cuisine generation
 * Handles ingredient-specific grammar patterns and cultural context fixes
 */

/**
 * Applies Air Nomad specific grammar and contextual fixes
 * Handles ingredient names, cooking techniques, and cultural patterns
 */
export function applyAirNomadCleanup(text: string): string {
  return text
    // Fix subject-verb agreement with plural Air Nomad ingredients
    .replace(/Crystal Cave Minerals has been/g, 'Crystal Cave Minerals have been')
    .replace(/Bamboo Shoots has been/g, 'Bamboo Shoots have been')
    .replace(/Lychee Nuts has been/g, 'Lychee Nuts have been')
    .replace(/Bell Peppers has been/g, 'Bell Peppers have been')
    .replace(/Chrysanthemum Greens has been/g, 'Chrysanthemum Greens have been')
    .replace(/Sacred Lotus Petals has been/g, 'Sacred Lotus Petals have been')
    .replace(/Wind Flower Petals has been/g, 'Wind Flower Petals have been')
    
    // Fix Air Nomad technique-specific constructions
    .replace(/steam-whipped with/gi, 'steam-whipped using')
    .replace(/wind-dried through/gi, 'wind-dried with')
    .replace(/cloud-braised in/gi, 'cloud-braised within')
    
    // Fix spiritual ingredient context patterns
    .replace(/sacred ingredients chosen for/gi, 'sacred ingredients selected for')
    .replace(/blessed ingredients picked for/gi, 'blessed ingredients gathered for')
    .replace(/mystical ingredients used for/gi, 'mystical ingredients employed in')
    
    // Fix Air Nomad cultural context grammar
    .replace(/temple preparation ritual/gi, 'temple preparation rituals')
    .replace(/monk meditation technique/gi, 'monastic meditation techniques')
    .replace(/sky bison feeding ceremony/gi, 'sky bison feeding ceremonies')
    
    // Fix ingredient pairing constructions
    .replace(/([A-Z][a-z\s]+) and ([A-Z][a-z\s]+) chosen for their/gi, '$1 and $2, chosen for their')
    .replace(/([A-Z][a-z\s]+), ([A-Z][a-z\s]+), and ([A-Z][a-z\s]+) selected for/gi, '$1, $2, and $3, selected for')
    
    // Fix festival and ceremony references
    .replace(/Vow of Silence Retreat traditions/gi, 'Vow of Silence Retreat tradition')
    .replace(/Sky Bison Appreciation Ceremony customs/gi, 'Sky Bison Appreciation Ceremony custom')
    .replace(/Wind Walker's Pilgrimage practices/gi, "Wind Walker's Pilgrimage practice")
    
    // Fix Air Nomad title constructions
    .replace(/Master ([A-Z][a-z]+) teaching/gi, 'Master $1 taught')
    .replace(/Avatar ([A-Z][a-z]+) discovering/gi, 'Avatar $1 discovered')
    .replace(/Guru ([A-Z][a-z]+) perfecting/gi, 'Guru $1 perfected');
}

/**
 * Validates Air Nomad dish name patterns and fixes common formatting issues
 */
export function cleanupAirNomadDishName(name: string): string {
  return name
    // Fix title case consistency
    .replace(/([A-Z][a-z]+)'s ([a-z])/g, "$1's $2")
    
    // Fix technique descriptor consistency
    .replace(/Steam-whipped/gi, 'Steam-Whipped')
    .replace(/Wind-dried/gi, 'Wind-Dried')
    .replace(/Cloud-braised/gi, 'Cloud-Braised')
    .replace(/Air-dried/gi, 'Air-Dried')
    
    // Fix spiritual title consistency
    .replace(/sacred ([A-Z])/gi, 'Sacred $1')
    .replace(/blessed ([A-Z])/gi, 'Blessed $1')
    .replace(/mystical ([A-Z])/gi, 'Mystical $1')
    .replace(/celestial ([A-Z])/gi, 'Celestial $1')
    
    // Remove redundant words in titles
    .replace(/Sacred Sacred/gi, 'Sacred')
    .replace(/Master's Master's/gi, "Master's")
    .replace(/Temple Temple/gi, 'Temple')
    
    // Fix capitalization after apostrophes
    .replace(/'s ([a-z])/g, "'s $1")
    .replace(/s' ([a-z])/g, "s' $1");
}

/**
 * Cleans up Air Nomad spiritual benefit descriptions
 */
export function cleanupSpiritualBenefit(benefit: string): string {
  return benefit
    // Fix spiritual terminology consistency
    .replace(/chakra/gi, 'chakra')
    .replace(/meditation/gi, 'meditation')
    .replace(/enlightenment/gi, 'enlightenment')
    .replace(/transcendence/gi, 'transcendence')
    
    // Fix action verb patterns
    .replace(/enhance/gi, 'enhances')
    .replace(/promote/gi, 'promotes')
    .replace(/stimulate/gi, 'stimulates')
    .replace(/awaken/gi, 'awakens')
    
    // Fix spiritual benefit sentence structure
    .replace(/^([a-z])/g, (match) => match.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
} 