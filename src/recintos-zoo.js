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
    recintosViaveis(animal, quantidade) {
        const recintosViaveis = [];
        const biomasAnimal = this.animais.getBioma(animal);
        const tamanhoNecessario = this.animais.getTamanhoAnimal(animal) * quantidade;
        const animalInfo = this.animais.getAnimal(animal);
        const isCarnivoro = this.animais.getAnimal(animal).carnivoro;
    
        Object.values(this._recintosDisponiveis).forEach(recinto => {
            const biomaCompativel = recinto.bioma.some(biomaRecinto => biomasAnimal.includes(biomaRecinto));
            let temEspaco;
            if(recinto.animais.length != recinto.animais.filter(a => a === animal).length){
                temEspaco = recinto.tamanhoLivre >= tamanhoNecessario + 1;
            }else{
                temEspaco = recinto.tamanhoLivre >= tamanhoNecessario;
            }
            let valido = true;  

                if(isCarnivoro){
                    let quantidade = recinto.animais.filter(a => a === animal).length;
                    if(recinto.animais.length != quantidade){
                        valido = false;
                    }
                }else{
                    let quantidade = recinto.animais.filter(a => this.animais.getAnimal(a).carnivoro === true).length;
                    if(quantidade != 0){
                        valido = false;
                    }
                }
                
                if(animal === "macaco" && quantidade == 1){
                    let quantidade = recinto.animais.filter(a => a).length;
                    if(quantidade == 0){
                        valido = false;
                    }
                }

                if(animal === "hipopotamo"){
                    let quantidade = recinto.animais.filter(a => a != animal).length
                    if(quantidade != 0 && recinto.bioma.filter(a => a === "selva" || "rio").length != 2){
                        valido = false;
                    }
                }

                if(temEspaco && valido && biomaCompativel){
                    recintosViaveis.push(recinto);
                }
        });
    
        return recintosViaveis;
    }
    
    
    
    analisaRecintos(animal, quantidade) {
        animal = animal.toLowerCase();
        if(quantidade <= 0){
            console.log("Quantidade inválida");
            return null;
        }
        if (this.animais.ehValido(animal)) {
            let tam = this.animais.getTamanhoAnimal(animal) * quantidade;
            this.calcularTamanhoLivre();


            console.log(this.recintosViaveis(animal,quantidade));
    
            console.log(`O animal ${animal} é válido.`);
            console.log(`Tamanho necessário: ${tam}`);
    
            return null;
        } else {
            console.log("Animal inválido");
            return null;
        }
    }
    
    
    

}

export { RecintosZoo as RecintosZoo };
