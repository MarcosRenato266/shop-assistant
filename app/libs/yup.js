import * as yup from 'yup';

yup.addMethod(yup.mixed, 'sameAs', function(ref, message) {
  return this.test('sameAs', message, function(value) {
    let other = this.resolve(ref);
    return !other || !value || value === other;
  });
});

yup.addMethod(yup.mixed, 'noWhitespace', function(message) {
  return this.test('noWhitespace', message, function(value) {
    return !/\s/.test(value);
  });
});

export default yup;