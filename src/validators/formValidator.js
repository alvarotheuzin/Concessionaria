import * as Yup from 'yup';

const formValidator = Yup.object().shape({
  nome: Yup.string()
    .required('Campo obrigatório'),

  numero: Yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Número inválido, formato esperado: (99) 99999-9999")
    .required("Número é obrigatório"),
    
  email: Yup.string()
    .required('Campo Obrigatorio'),
});

export default formValidator;
