export class AnimaisValidos {
    constructor() {
        this._animalValidos = {
            leao: {
                tamanho: 3,
                bioma: ["savana"],
                carnivoro: true
            },
            leopardo: {
                tamanho: 2,
                bioma: ["savana"],
                carnivoro: true
            },
            crocodilo: {
                tamanho: 3,
                bioma: ["rio"],
                carnivoro: true
            },
            macaco: {
                tamanho: 1,
                bioma: ["savana", "floresta"],
                carnivoro: false
            },
            gazela: {
                tamanho: 2,
                bioma: ["savana"],
                carnivoro: false
            },
            hipopotamo: {
                tamanho: 4,
                bioma: ["savana", "rio"],
                carnivoro: false
            }
        };
    }

    getTamanhoAnimal(animal){
        return this._animalValidos[animal]?.tamanho || 0;
    }
    
    ehValido(animal) {
        return this._animalValidos.hasOwnProperty(animal);
    }
    
    getBioma(animal){
        return this._animalValidos[animal].bioma;
    }

    getAnimal(animal){
        return this._animalValidos[animal];
    }


}
