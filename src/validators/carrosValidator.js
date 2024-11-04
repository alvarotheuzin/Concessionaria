import * as Yup from 'yup';

const carrosValidator = Yup.object().shape({
  nome: Yup.string()
    .required('Campo obrigatório'),
  
  marca: Yup.string()
    .required('Campo obrigatório'),

  imagem: Yup.string()
    .url('Digite uma URL válida'),

  valor: Yup.number()
    .required('Campo obrigatório'),

  ano: Yup.number()
    .required('Campo obrigatório'),

  direcao: Yup.string()
    .required('Campo obrigatório'),

  cambio: Yup.string()
    .required('Campo obrigatório'),

  motor: Yup.string()
    .required('Campo obrigatório'),

  cor: Yup.string()
    .required('Campo obrigatório'),
    
  portas: Yup.number()
  .required('Campo obrigatório'),
  
});

export default carrosValidator;
