import { AnimaisValidos } from "./Animais_Validos.js";
class RecintosZoo {
    constructor(){
        this._recintosDisponiveis = {
            recinto_1:{
                cod: 1,
                bioma: ["savana"],
                tamanhoTotal: 10,
                animais: ["macaco","macaco","macaco"],
                recintoLivre:10
            },
            recinto_2:{
                cod: 2,
                bioma: ["floresta"],
                tamanhoTotal: 5,
                animais: [],
                recintoLivre:5
            },
            recinto_3:{
                cod: 3,
                bioma: ["savana","rio"],
                tamanhoTotal: 7,
                animais: ["gazela"],
                recintoLivre:7
            },
            recinto_4:{
                cod: 4,
                bioma: ["rio"],
                tamanhoTotal: 8,
                animais: [],
                recintoLivre:8
            },
            recinto_5:{
                cod: 5,
                bioma: ["savana"],
                tamanhoTotal: 9,
                animais: ["leao"],
                recintoLivre:9
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
    recintosViaveis(animal, tam) {
        const recintosViaveis = [];
        const biomasAnimal = this.animais.getBioma(animal); // Obtém os biomas compatíveis com o animal
    
        Object.values(this._recintosDisponiveis).forEach(recinto => {
            const biomaCompativel = recinto.bioma.some(biomaRecinto => biomasAnimal.includes(biomaRecinto));
            const temEspaco = recinto.recintoLivre >= tam;//arrumar para verificar todos os animai
                                                           //pensei num metodo se tiver um animal diferente ele aumenta
            //verificar os outros elementos,
            if(animal.carnivoro == true){
                //verifica se tiver algum outro animal, se tiver não é valido pois carnivores somente com a mesma especie
            }
            if(animal == "hipopotamo"){
                //verificar se tem um animal tera que ser savana e rio
            }
            if(animal == "macaco" && tam == 1){
                //verificar se não irar fica sozinho, se tiver outra especie vai tar td bem
                //caso contrario não vai dar
            }
            if (biomaCompativel && temEspaco) {
                recintosViaveis.push(recinto);
            }
        });
    
        return recintosViaveis;
    }
    
    analisaRecintos(animal, quantidade) {
        if (this.animais.ehValido(animal)) {
            let tam = this.animais.getTamanhoAnimal(animal) * quantidade;
            this.calcularTamanhoLivre();


            console.log(this._recintosDisponiveis);
    
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
