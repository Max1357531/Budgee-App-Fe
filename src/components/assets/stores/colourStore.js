import { isValidHex } from "@/utils/validators";
import { defineStore } from "pinia";

export const useColourStore = defineStore('colour', {
    state: () => ({
        colourPalette: [],
        selectedColour: null,
        recentColours: [],
        colourError: null,
    }),

    getters: {
        getPalette: (state) => state.colourPalette,
        getSelectedColour: (state) => state.selectedColour,
        getRecentColours: (state) => state.recentColours,
        getColourError: (state) => state.colourError,
        getRandomColour: (state) => {
            const randomIndex = Math.floor(Math.random() * state.colourPalette.length);
            return state.colourPalette[randomIndex]
        },
        getHexFromId: (state)=>{
            return (id) => state.colourPalette.find((col)=> col.id === id).hex_code
        }
    },

    actions: {
        setSelectedColour(colour) {
            if (this.colourPalette.includes(colour)) {
                this.selectedColour = colour;
                this.addRecentColour(colour);
                this.colourError = null
            } else {
                console.warn('Invalid colour:', colour);
                this.colourError = `Invalid colour selected: ${colour}`

                // Fallback to random colour
                const fallback = this.getRandomColour
                this.selectedColour = fallback
                this.addRecentColour(fallback)
            }
        },

        addRecentColour(colour) {
            if (!this.recentColours.includes(colour)) {
                this.recentColours.unshift(colour)
                if (this.recentColours.length > 5) {
                    this.recentColours.pop();
                }
            };
        },

        addCustomColour(colour) {
            if (!isValidHex(colour)) {
                console.warn('Invalid hex format:', colour)
                this.colourError = `Hex code "${colour}" is not valid. Must be in #RRGGBB format.`
                return
            }

            if (!this.colourPalette.includes(colour)) {
                this.colourPalette.push(colour)
                this.colourError = null
            } else {
                // clear error if it's already there
                this.colourError = null
            }
        }
    }
})