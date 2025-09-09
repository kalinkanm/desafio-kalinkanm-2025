import { BuscaDados } from "./busca-dados.js";

class ValidaInput {

    validarParametrosEntrada(arrayBrinquedos1, arrayBrinquedos2, arrayAnimais) {

        // Caso animal seja inválido, apresentar erro "Animal inválido"
        for (const nome of arrayAnimais) {
            const animal = new BuscaDados().buscarAnimalPorNome(nome);
            if (!animal) {
                return { erro: "Animal inválido", lista: undefined }
            }
        }

        //Caso animal seja duplicado, apresentar erro "Animal inválido"
        if (new Set(arrayAnimais).size !== arrayAnimais.length) {
            return { erro: "Animal inválido", lista: undefined }
        }

        //Caso brinquedo seja inválido, apresentar erro "Brinquedo inválido"
        const brinquedosPessoa1 = this.buscarBrinquedoNaLista(arrayBrinquedos1);
        if (!brinquedosPessoa1) {
            return { erro: "Brinquedo inválido", lista: undefined }
        }

        const brinquedosPessoa2 = this.buscarBrinquedoNaLista(arrayBrinquedos2);
        if (!brinquedosPessoa2) {
            return { erro: "Brinquedo inválido", lista: undefined }
        }

        //Caso brinquedo seja duplicado, apresentar erro "Brinquedo inválido"
        if (new Set(arrayBrinquedos1).size !== arrayBrinquedos1.length) {
            return { erro: "Brinquedo inválido", lista: undefined }
        }
        if (new Set(arrayBrinquedos2).size !== arrayBrinquedos2.length) {
            return { erro: "Brinquedo inválido", lista: undefined }
        }

    }

    buscarBrinquedoNaLista(arrayBrinquedos) {
        const listaTodosAnimais = new BuscaDados().buscarAnimais();
        let todosBrinquedos = [];

        for (const animal of listaTodosAnimais) {
            todosBrinquedos.push(animal.brinquedos);
        }
        const todosBrinquedosFlattened = todosBrinquedos.flat();

        const contemBrinquedos = arrayBrinquedos.every(item => todosBrinquedosFlattened.includes(item));
        return contemBrinquedos;

    };

}

export { ValidaInput as ValidaInput };