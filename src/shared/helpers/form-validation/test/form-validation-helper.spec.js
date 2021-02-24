import { FormValidationHelper } from './mock';

import jsdom from 'jsdom';
const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;

describe('email', () => {
  it('should test the invalid email', () => {
    const input = document.createElement('input');
    input.value = 'eduardo';
    expect(FormValidationHelper.emailInvalid(input)).toBeTruthy();
  });

  it('should test the invalid email', () => {
    const input = document.createElement('input');
    input.value = 'eduardo@';
    expect(FormValidationHelper.emailInvalid(input)).toBeTruthy();
  });

  it('should test if the email is not valid', () => {
    const input = document.createElement('input');
    input.value = 'eduardo@eduardo.com.br';
    expect(FormValidationHelper.emailInvalid(input)).toBeFalsy();
  });

  it('should test if the email is undefined', () => {
    const input = document.createElement('input');
    expect(FormValidationHelper.emailInvalid(input)).toBeTruthy();
  });
});


describe('number of invalid characters', () => {
  it('should test if the user exists', () => {
    const input = document.createElement('input');
    input.value = '2';
    expect(FormValidationHelper.quantityCharactersInvalid(input, 2, 2)).toBeTruthy();
    input.value = '22';
    expect(FormValidationHelper.quantityCharactersInvalid(input, 2, 2)).toBeFalsy();
    input.value = '';
    expect(FormValidationHelper.quantityCharactersInvalid(input, 2, 2)).toBeTruthy();
  });
});
