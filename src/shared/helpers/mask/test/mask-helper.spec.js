import { MaskHelper } from './../mask-helper';

describe('phone', () => {

  test('should have the full phone', () => {
    expect(MaskHelper.phone('1111111111')).toEqual('(11) 1111-1111');
  });

  test('should have the full cell', () => {
    expect(MaskHelper.phone('11111111111')).toEqual('(11) 11111-1111');
  });

  test('should have the phone empty', () => {
    expect(MaskHelper.phone('')).toEqual('');
  });

  test('should test the phone null', () => {
    expect(MaskHelper.phone()).toBeUndefined();
  });

  test('should test letters on the phone', () => {
    expect(MaskHelper.phone('asasasa')).toEqual('');
  });

});

describe('cpf', () => {

  test('should have the full cpf', () => {
    expect(MaskHelper.cpf('43333333333')).toEqual('433.333.333-33');
  });

  test('should have the cpf empty', () => {
    expect(MaskHelper.cpf('')).toEqual('');
  });

  test('should test the cpf null', () => {
    expect(MaskHelper.cpf()).toBeUndefined();
  });

  test('should test letters on the phone', () => {
    expect(MaskHelper.cpf('asasasa')).toEqual('');
  });

});

describe('remove the mask', () => {

  test('should remove the cpf mask', () => {
    expect(MaskHelper.removeAll('111.111.111-11')).toEqual('11111111111');
  });

  test('remove the cell mask', () => {
    expect(MaskHelper.removeAll('(11) 1111-1111')).toEqual('1111111111');
  });

  test('remove the telephone mask', () => {
    expect(MaskHelper.removeAll('(11) 11111-1111')).toEqual('11111111111');
  });
});