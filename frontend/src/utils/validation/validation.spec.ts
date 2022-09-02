import { loginValidation } from './validation'
describe('Validation function', () => {
  it('The function loginValidation returns text if the data is not correct', () => {
    const loginText = ' jack'
    const textLongSymbol = 'helloTradyJackBreadly'
    const twoSymbol = 'hi'
    // Only letters, numbers and _
    expect(loginValidation.validate(loginText)).toEqual('Only letters, numbers and _')
    // input 21 symbol
    expect(loginValidation.validate(textLongSymbol)).toEqual('Only letters, numbers and _')
    // the symbol is less than three
    expect(loginValidation.validate(twoSymbol)).toEqual('Only letters, numbers and _')
  })
})
