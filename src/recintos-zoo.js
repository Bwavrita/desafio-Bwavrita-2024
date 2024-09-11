import { AnimaisValidos } from "./Animais_Validos.js";
class RecintosZoo {
    constructor(){
        this._recintosDisponiveis = [
            {
                cod: 1,
                bioma: ["savana"],
                tamanhoTotal: 10,
                animais: ["MACACO","MACACO","MACACO"],
                tamanhoLivre:10
            },
           {
                cod: 2,
                bioma: ["floresta"],
                tamanhoTotal: 5,
                animais: [],
                tamanhoLivre:5
            },
           {
                cod: 3,
                bioma: ["savana","rio"],
                tamanhoTotal: 7,
                animais: ["GAZELA"],
                tamanhoLivre:7
            },
            {
                cod: 4,
                bioma: ["rio"],
                tamanhoTotal: 8,
                animais: [],
                tamanhoLivre:8
            },
            {
                cod: 5,
                bioma: ["savana"],
                tamanhoTotal: 9,
                animais: ["LEAO"],
                tamanhoLivre:9
            }
        ];
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
        if (isNaN(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }
    
        if (!this.animais.ehValido(animal)) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
    
        const recintosViaveis = [];
        const tamanhoNecessario = this.animais.getTamanhoAnimal(animal) * quantidade;
        const biomasAnimal = this.animais.getBioma(animal);
        const isCarnivoro = this.animais.getAnimal(animal).carnivoro;
    
        this.calcularTamanhoLivre();
    
        Object.values(this._recintosDisponiveis).forEach(recinto => {
            const biomaCompativel = recinto.bioma.some(biomaRecinto => biomasAnimal.includes(biomaRecinto));
            let espacoNecessario = tamanhoNecessario;
            if (recinto.animais.length !== recinto.animais.filter(a => a === animal).length) {
                espacoNecessario += 1;
            }
    
            const temEspaco = recinto.tamanhoLivre >= espacoNecessario;
            let valido = true;

            if (isCarnivoro && recinto.animais.some(a => a !== animal)) {
                valido = false;
            } else if (!isCarnivoro && recinto.animais.some(a => this.animais.getAnimal(a).carnivoro)) {
                valido = false;
            }
    
            if (animal === "MACACO" && quantidade === 1 && recinto.animais.length === 0) {
                valido = false;
            }
    
            if (animal === "HIPOPOTAMO" && recinto.animais.some(a => a !== "HIPOPOTAMO") && !(recinto.bioma.includes("savana") && recinto.bioma.includes("rio"))) {
                valido = false;
            }
    
            if (temEspaco && valido && biomaCompativel) {
                recintosViaveis.push(`Recinto ${recinto.cod} (espaço livre: ${recinto.tamanhoLivre - espacoNecessario} total: ${recinto.tamanhoTotal})`);
            }
        });
    
        return recintosViaveis.length > 0 
            ? { erro: null, recintosViaveis } 
            : { erro: "Não há recinto viável", recintosViaveis: null };
    }
    
    

}

export { RecintosZoo as RecintosZoo };
