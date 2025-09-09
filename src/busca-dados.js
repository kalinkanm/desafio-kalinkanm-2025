import * as fs from 'node:fs';

class BuscaDados {

    buscarAnimais() {
        return JSON.parse(fs.readFileSync("./src/lista-animais.json", "utf-8"))
    };

    buscarAnimalPorNome(nome) {
        const listaTodosAnimais = this.buscarAnimais();
        return listaTodosAnimais.find(animal => animal.nome === nome);
    };

}

export { BuscaDados as BuscaDados };