import { ValidaInput } from "./valida-input.js";
import { BuscaDados } from "./busca-dados.js";


class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    let brinquedosPessoa1Minuscula = brinquedosPessoa1.toLowerCase();
    let arrayBrinquedosPessoa1 = brinquedosPessoa1Minuscula.split(",");
    let brinquedosPessoa2Minuscula = brinquedosPessoa2.toLowerCase();
    let arrayBrinquedosPessoa2 = brinquedosPessoa2Minuscula.split(",");
    let ordemAnimaisMinuscula = ordemAnimais.toLowerCase();
    let arrayOrdemAnimais = ordemAnimaisMinuscula.split(",");

    const validaInput = new ValidaInput().validarParametrosEntrada(arrayBrinquedosPessoa1, arrayBrinquedosPessoa2, arrayOrdemAnimais);
    if (validaInput?.erro) {
      return validaInput;
    }

    const destinoAnimais = this.destinoAnimal(arrayBrinquedosPessoa1, arrayBrinquedosPessoa2, arrayOrdemAnimais);
    return { lista: destinoAnimais };
  };


  destinoAnimal(arrayBrinquedosPessoa1, arrayBrinquedosPessoa2, arrayOrdemAnimais) {
    let destinoAnimaisLista = [];
    let destinoAnimal = "";

    for (const nomeAnimal of arrayOrdemAnimais) {
      const animal = new BuscaDados().buscarAnimalPorNome(nomeAnimal);
      const arrayBrinquedosAnimal = animal.brinquedos;
      const nomeAnimalFormatado = this.primeiraMaiuscula(animal.nome);

      if (animal.nome != "loco") {
        const pessoa1Habilitada = this.todosBrinquedosNaOrdem(arrayBrinquedosPessoa1, arrayBrinquedosAnimal);
        const pessoa2Habilitada = this.todosBrinquedosNaOrdem(arrayBrinquedosPessoa2, arrayBrinquedosAnimal);

        // Se ambas as pessoas tiverem condições de adoção, ninguém fica com o animal
        if ((pessoa1Habilitada && pessoa2Habilitada) || (!pessoa1Habilitada && !pessoa2Habilitada)) {
          destinoAnimal = "abrigo";
        } else if (pessoa1Habilitada) {
          destinoAnimal = "pessoa 1";
        } else {
          destinoAnimal = "pessoa 2";
        }
        destinoAnimaisLista.push({ nome: nomeAnimalFormatado, destino: destinoAnimal });
      }
    }

    // Loco não se importa com a ordem dos seus brinquedos desde que tenha outro animal como companhia
    if (arrayOrdemAnimais.includes("loco")) {
      const pessoa1Habilitada = destinoAnimaisLista.some((animal) => animal.destino == "pessoa 1");
      const pessoa2Habilitada = destinoAnimaisLista.some((animal) => animal.destino == "pessoa 2");

      if ((pessoa1Habilitada && pessoa2Habilitada) || (!pessoa1Habilitada && !pessoa2Habilitada)) {
        destinoAnimal = "abrigo";
      } else if (pessoa1Habilitada) {
        destinoAnimal = "pessoa 1";
      } else {
        destinoAnimal = "pessoa 2";
      }

      destinoAnimaisLista.push({ nome: "Loco", destino: destinoAnimal });
    }

    // Uma pessoa não pode levar mais de três animais para casa
    let destinoAnimaisListaMax3 = [];
    let quantidadeDeAnimaisPessoa1 = 0;
    let quantidadeDeAnimaisPessoa2 = 0;

    for (const animal of destinoAnimaisLista) {
      const nomeAnimalFormatado = this.primeiraMaiuscula(animal.nome);

      if (animal.destino === "pessoa 1" && quantidadeDeAnimaisPessoa1 < 3) {
        destinoAnimaisListaMax3.push(animal);
        quantidadeDeAnimaisPessoa1++;
      } else if (animal.destino === "pessoa 2" && quantidadeDeAnimaisPessoa2 < 3) {
        destinoAnimaisListaMax3.push(animal);
        quantidadeDeAnimaisPessoa2++;
      } else {
        destinoAnimaisListaMax3.push({ nome: nomeAnimalFormatado, destino: "abrigo" });
      }
    }

    // O programa deve retornar uma estrutura contendo a lista em ordem alfabética dos animais e com quem ficaram
    const destinoAnimaisListaOrdenada = this.ordemAlfabetica(destinoAnimaisListaMax3);

    // O formato de saída deve ser "nome animal - pessoa número" ou "nome animal - abrigo"
    const listaFinal = destinoAnimaisListaOrdenada.map(({ nome, destino }) => `${nome} - ${destino}`);
    return listaFinal;

  }

  todosBrinquedosNaOrdem(arrayBrinquedos, arrayBrinquedosAnimal) {
    // O animal vai para a pessoa que mostrar todos seus brinquedos favoritos...
    // Uma pessoa pode intercalar brinquedos que o animal queira ou não
    const arrayBrinquedosFiltrado = arrayBrinquedos.filter(item => arrayBrinquedosAnimal.includes(item));
    if (arrayBrinquedosFiltrado.length < arrayBrinquedosAnimal.length) {
      return false;
    }
    // ...na ordem desejada
    if (arrayBrinquedosFiltrado.every((valor, index) => valor === arrayBrinquedosAnimal[index])) {
      return true;
    }
  }

  primeiraMaiuscula(nomeProprio) {
    return nomeProprio.charAt(0).toUpperCase() + nomeProprio.slice(1);
  }

  ordemAlfabetica(lista) {
    return lista.sort((a, b) => a.nome.localeCompare(b.nome));
  }

}

export { AbrigoAnimais as AbrigoAnimais };
