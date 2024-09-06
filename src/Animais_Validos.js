export class AnimaisValidos {
    constructor(animal) {
        this._animalValidos = { // Object contendo todas os animais valido, apos isto criar um metodo para validar animas
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
        this.animal = animal;
    }

}
