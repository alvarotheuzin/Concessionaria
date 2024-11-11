import * as Yup from 'yup';

const carrosValidator = Yup.object().shape({
  nome: Yup.string()
    .required('Campo obrigatório'),
  
  marca: Yup.string()
    .required('Campo obrigatório'),
  
    modelo: Yup.string()
    .required('Campo obrigatório'),

  ano: Yup.number()
    .required('Campo obrigatório'),
    
  portas: Yup.number()
  .required('Campo obrigatório'),

  clienteSelecionado: Yup.string()
  .required('Campo obrigatório'),
  
  
});

export default carrosValidator;
