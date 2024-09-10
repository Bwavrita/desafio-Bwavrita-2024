import { AnimaisValidos } from "./Animais_Validos.js";
class RecintosZoo {
    constructor(){
        this._recintosDisponiveis = {
            recinto_1:{
                cod: 1,
                bioma: ["savana"],
                tamanhoTotal: 10,
                animais: ["macaco","macaco","macaco"],
                tamanhoLivre:10
            },
            recinto_2:{
                cod: 2,
                bioma: ["floresta"],
                tamanhoTotal: 5,
                animais: [],
                tamanhoLivre:5
            },
            recinto_3:{
                cod: 3,
                bioma: ["savana","rio"],
                tamanhoTotal: 7,
                animais: ["gazela"],
                tamanhoLivre:7
            },
            recinto_4:{
                cod: 4,
                bioma: ["rio"],
                tamanhoTotal: 8,
                animais: [],
                tamanhoLivre:8
            },
            recinto_5:{
                cod: 5,
                bioma: ["savana"],
                tamanhoTotal: 9,
                animais: ["leao"],
                tamanhoLivre:9
            }
        };
        this.animais = new AnimaisValidos();
    }
    
    calcularTamanhoLivre() {
        Object.values(this._recintosDisponiveis).forEach(recinto => {
            let tamOcupado = 0;
            recinto.animais.forEach(element => {
                tamOcupado += this.animais.getTamanhoAnimal(element);
            });
    
            recinto.tamanhoLivre = recinto.tamanhoTotal - tamOcupado;
        });
    }

    analisaRecintos(animal, quantidade) {
        animal = animal.toLowerCase();
    
        if (isNaN(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }
    
        if (!this.animais.ehValido(animal)) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
    
        const recintosViaveis = [];
        const tamanhoNecessario = this.animais.getTamanhoAnimal(animal) * quantidade;
    
        this.calcularTamanhoLivre();
    
        Object.values(this._recintosDisponiveis).forEach(recinto => {
            const biomaCompativel = recinto.bioma.some(biomaRecinto => this.animais.getBioma(animal).includes(biomaRecinto));
            let temEspaco;
            let espaco = tamanhoNecessario;
            if (recinto.animais.length != recinto.animais.filter(a => a === animal).length) {
                espaco+=1;
                temEspaco = recinto.tamanhoLivre >= espaco;
            } else {
                temEspaco = recinto.tamanhoLivre >= espaco;
            }
    
            let valido = true;  

            if (this.animais.getAnimal(animal).carnivoro) {
                let quantidadeCarnivoros = recinto.animais.filter(a => a === animal).length;
                if (recinto.animais.length != quantidadeCarnivoros) {
                    valido = false;
                }
            } else {
                let quantidadeCarnivoros = recinto.animais.filter(a => this.animais.getAnimal(a).carnivoro === true).length;
                if (quantidadeCarnivoros != 0) {
                    valido = false;
                }
            }
    
            if (animal === "macaco" && quantidade == 1) {
                let quantidadeAnimais = recinto.animais.filter(a => a).length;
                if (quantidadeAnimais == 0) {
                    valido = false;
                }
            }
    
            if (animal === "hipopotamo") {
                const biomasDoRecinto = recinto.bioma;
                let quantidadeNaoHipopotamos = recinto.animais.filter(a => a != animal).length;
                if (quantidadeNaoHipopotamos != 0 && !(biomasDoRecinto.includes("savana") && biomasDoRecinto.includes("rio"))) {
                    valido = false;
                }
            }            

            if (temEspaco && valido && biomaCompativel) {
                recintosViaveis.push(`Recinto ${recinto.cod} (espaço livre: ${ recinto.tamanhoLivre - espaco} total: ${recinto.tamanhoTotal})`);
            }
        });
    
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        } else {
            return { erro: null, recintosViaveis };
        }
    }
    

}

export { RecintosZoo as RecintosZoo };
