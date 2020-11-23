const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({
    abilities: Array,
    base_experience: Number,
    forms: Array,
    game_indices: Array,
    moves: Array,
    stats: Array,
    types: Array,
    height: Number,
    id: Number,
    is_default: Boolean,
    location_area_encounters: String,
    name: String,
    order: Number,
    weight: Number,
    species: Object,
    sprites: {
        type: Object,
        other: {
            type: Object,
            dream_world: { type: Object },
            "official-artwork": { type: Object },
        },
    },
});

module.exports = model("Pokemon", pokemonSchema);
