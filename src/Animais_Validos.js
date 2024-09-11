export class AnimaisValidos {
    constructor() {
        this._animalValidos = {
            LEAO: {
                tamanho: 3,
                bioma: ["savana"],
                carnivoro: true
            },
            LEOPARDO: {
                tamanho: 2,
                bioma: ["savana"],
                carnivoro: true
            },
            CROCODILO: {
                tamanho: 3,
                bioma: ["rio"],
                carnivoro: true
            },
            MACACO: {
                tamanho: 1,
                bioma: ["savana", "floresta"],
                carnivoro: false
            },
           GAZELA: {
                tamanho: 2,
                bioma: ["savana"],
                carnivoro: false
            },
            HIPOPOTAMO: {
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
