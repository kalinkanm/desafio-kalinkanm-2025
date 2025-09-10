import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,OSSO', 'RATO,BOLA', 'Bola');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'RATO,BOLA', 'Bola,Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve verificar que uma pessoa não adotou mais de três animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,CAIXA',
      'LASER,SKATE,RATO,BOLA', 'Rex,Zero,Bebe,Loco');

    expect(resultado.lista[0]).toBe('Bebe - pessoa 2');
    expect(resultado.lista[1]).toBe('Loco - abrigo');
    expect(resultado.lista[2]).toBe('Rex - pessoa 2');
    expect(resultado.lista[3]).toBe('Zero - pessoa 2');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve verificar que, em caso de empate, ninguém fica com o animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,NOVELO',
      'CAIXA,NOVELO', 'Bola,Bebe');

    expect(resultado.lista[0]).toBe('Bebe - abrigo');
    expect(resultado.lista[1]).toBe('Bola - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve verificar se Loco foi adotado com companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,NOVELO',
      'CAIXA,RATO', 'Loco,Bola');

    expect(resultado.lista[0]).toBe('Bola - pessoa 1');
    expect(resultado.lista[1]).toBe('Loco - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve verificar se Loco não é adotado sem companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO',
      'CAIXA,RATO', 'Loco,Bola');

    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

});
