const strings = {
  scanner: {
    screenTitle: 
      "Aluguel de Devices",
    instructionText: 
      "Por favor, escaneie o QR Code",
    idMismatchError:
      "Por favor escaneie o mesmo item selecionado na lista do inventário.",
    connectionError:
      "Não foi possível conectar-se com o servidor. Por favor, tente mais tarde.",
    validationError: 
      "O QR-Code escaneado não é válido para esse inventário.",
    parsingError:
      "Infelizmente, este QR-Code se encontra mal formatado. Consulte o dono do inventário."
  },
  logIn:{
    invalidEmail:
    " email inválido!",
    userNotFound:
    "Usuário não encontrado!",
    wrongPassword:
      "Senha incorreta!",
    userDisabled :
      "Seu usuário foi desabilitado!",
    logInError:
      "Erro no login, tente novamente mais tarde!",
    firstPlaceholder:
      "Email",
    secondPlaceholder:
      "Senha"
  },
  signUp:{
    differentPassword:
      "Senhas diferentes",
    emailAlreadyInUse:
      "Email já cadastrado!",
    invalidEmail:
      "Email inválido!",
    weakPassword:
      "Essa senha é muito fraca!",
    signUpError:
      "Erro ao cadastrar, tente novamente mais tarde",
    firstPlaceholder:
      "Email",
    secondPlaceholder:
      "Senha",
    thirdlaceholder:
      "Repita a Senha"
  },
  rentedItem: {
    connectionError:
    "Não foi possível conectar-se com o servidor. Por favor, tente mais tarde.",
    checkoutSuccess:
    "Obrigado, o item foi devolvido com sucesso."
  }
};

export default strings;
