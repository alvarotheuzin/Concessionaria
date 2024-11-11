import * as Yup from 'yup';

const pecasValidator = Yup.object().shape({

  nome: Yup.string()
    .required('Campo obrigatório'),

  marca: Yup.string()
    .required('Campo obrigatório'),

  imagem: Yup.string()
    .required('Digite uma URL válida'),

  valor: Yup.number()
    .required('Campo obrigatório'),

    quantidade: Yup.number()
    .required('Quantidade Obrigatoria'),

});

export default pecasValidator;
